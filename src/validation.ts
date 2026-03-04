import { Task } from './types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateTask(task: Task): void {
  // Validate title
  if (!task.title || task.title.trim().length === 0) {
    throw new ValidationError('Task title cannot be empty');
  }

  if (task.title.length > 200) {
    throw new ValidationError('Task title cannot exceed 200 characters');
  }

  // Basic emoji/unicode validation
  // Bug: This regex doesn't properly support all emoji
  // Issue #3 will track fixing this
  const basicAlphanumeric = /^[a-zA-Z0-9\s\-_.,!?]+$/;
  if (!basicAlphanumeric.test(task.title)) {
    throw new ValidationError('Task title contains invalid characters');
  }

  // Validate description
  if (task.description && task.description.length > 2000) {
    throw new ValidationError('Task description cannot exceed 2000 characters');
  }

  // Validate tags
  if (task.tags.length > 10) {
    throw new ValidationError('Task cannot have more than 10 tags');
  }

  task.tags.forEach(tag => {
    if (tag.length > 50) {
      throw new ValidationError('Tag cannot exceed 50 characters');
    }
  });

  // Validate dates
  if (task.dueDate && task.dueDate < task.createdAt) {
    throw new ValidationError('Due date cannot be before creation date');
  }
}

export function sanitizeInput(input: string): string {
  // Bug: Inadequate XSS protection
  // Issue #10 will track this security vulnerability
  return input
    .trim()
    .replace(/<script>/gi, '')
    .replace(/<\/script>/gi, '');
}
