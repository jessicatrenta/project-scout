import { Task } from './types';

export function searchTasks(tasks: Task[], query: string): Task[] {
  const keywords = query.toLowerCase().split(' ');
  
  return tasks.filter(task => {
    const searchText = `${task.title} ${task.description}`.toLowerCase();
    return keywords.every(keyword => searchText.includes(keyword));
  });
}

export function searchByRegex(tasks: Task[], pattern: RegExp): Task[] {
  return tasks.filter(task => 
    pattern.test(task.title) || pattern.test(task.description)
  );
}

