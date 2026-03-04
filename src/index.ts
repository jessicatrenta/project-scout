import { TaskManager } from './TaskManager';
import { TaskStatus, TaskPriority } from './types';

// Main entry point
const manager = new TaskManager();

// Example usage
const task1 = manager.createTask({
  title: 'Implement user authentication',
  description: 'Add JWT-based authentication system',
  status: TaskStatus.IN_PROGRESS,
  priority: TaskPriority.HIGH,
  assignee: 'jessica',
  tags: ['security', 'backend'],
  dueDate: new Date('2025-01-15')
});

const task2 = manager.createTask({
  title: 'Fix memory leak in task manager',
  description: 'Subscribers are never cleaned up, causing memory leak',
  status: TaskStatus.TODO,
  priority: TaskPriority.CRITICAL,
  tags: ['bug', 'performance'],
  dueDate: new Date('2024-12-30')
});

const task3 = manager.createTask({
  title: 'Add emoji support to task titles',
  description: 'Users want to use emoji in task titles for better visual organization',
  status: TaskStatus.DONE,
  priority: TaskPriority.MEDIUM,
  assignee: 'jessica',
  tags: ['feature', 'ux']
});

console.log('Task Manager initialized with sample tasks');
console.log(`Total tasks: ${manager.listTasks().length}`);

export { TaskManager };
export * from './types';
export * from './validation';
