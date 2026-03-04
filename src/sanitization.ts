/**
 * Sanitization utilities for task data
 * 
 * WARNING: This module has known security issues
 * See Issue #10 for details on XSS vulnerabilities
 */

export function sanitizeHtml(html: string): string {
  // Bug: This is inadequate for XSS protection
  // Only removes script tags, but misses many attack vectors
  // Issue #10 tracks the security vulnerability introduced by Issue #3 fix
  
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

export function sanitizeFileName(filename: string): string {
  // Remove path traversal attempts
  return filename.replace(/[\/\\]/g, '_').replace(/\.\./g, '');
}

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
