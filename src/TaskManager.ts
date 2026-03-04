import { searchTasks } from "./search";
import { Task, TaskStatus, TaskPriority, TaskFilter } from "./types";
import { validateTask } from "./validation";

export class TaskManager {
  private tasks: Map<string, Task>;
  private subscribers: ((task: Task) => void)[];

  constructor() {
    this.tasks = new Map();
    this.subscribers = [];
  }

  createTask(taskData: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const task: Task = {
      ...taskData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Validate task before creating
    validateTask(task);

    this.tasks.set(task.id, task);
    this.notifySubscribers(task);

    return task;
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }

    const updatedTask: Task = {
      ...task,
      ...updates,
      id: task.id, // Prevent ID change
      updatedAt: new Date(),
    };

    validateTask(updatedTask);
    this.tasks.set(id, updatedTask);
    this.notifySubscribers(updatedTask);

    return updatedTask;
  }

  deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  listTasks(filter?: TaskFilter): Task[] {
    let tasks = Array.from(this.tasks.values());

    if (!filter) {
      return tasks;
    }

    if (filter.status) {
      tasks = tasks.filter((t) => t.status === filter.status);
    }

    if (filter.priority) {
      tasks = tasks.filter((t) => t.priority === filter.priority);
    }

    if (filter.assignee) {
      tasks = tasks.filter((t) => t.assignee === filter.assignee);
    }

    if (filter.tags && filter.tags.length > 0) {
      tasks = tasks.filter((t) =>
        filter.tags!.some((tag) => t.tags.includes(tag)),
      );
    }

    if (filter.dateRange) {
      tasks = tasks.filter((t) => {
        if (!t.dueDate) return false;
        return (
          t.dueDate >= filter.dateRange!.start &&
          t.dueDate <= filter.dateRange!.end
        );
      });
    }

    return tasks;
  }

  subscribe(callback: (task: Task) => void): void {
    this.subscribers.push(callback);
  }

  private notifySubscribers(task: Task): void {
    this.subscribers.forEach((callback) => callback(task));
  }

  private generateId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  searchTasks(query: string): Task[] {
    const allTasks = Array.from(this.tasks.values());
    return searchTasks(allTasks, query);
  }

  // Bug: Memory leak - subscribers never removed
  // Issue #1 will track this

  // Bug: Date filter comparison is incorrect for edge cases
  // Issue #7 will track this
}
