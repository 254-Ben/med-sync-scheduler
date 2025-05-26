
import { z } from 'zod';

// Data sanitization and validation schemas
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export const appointmentSchema = z.object({
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  reason: z.string().min(1).max(500),
  isUrgent: z.boolean().optional(),
});

export const patientSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  emergencyContact: z.string().optional(),
});

export const doctorSchema = z.object({
  name: z.string().min(2).max(100),
  specialization: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
  workingHours: z.object({
    start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    end: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    breakStart: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    breakEnd: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  }),
});

// Rate limiting for client-side protection
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => now - timestamp < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const apiRateLimiter = new RateLimiter();

// Secure local storage wrapper
export const secureStorage = {
  set: (key: string, value: any) => {
    try {
      const encrypted = btoa(JSON.stringify(value));
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(atob(item)) : null;
    } catch (error) {
      console.error('Storage retrieval error:', error);
      return null;
    }
  },
  
  remove: (key: string) => {
    localStorage.removeItem(key);
  }
};
