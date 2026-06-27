import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/app.constants';

/**
 * StorageService
 * ----------------------------------------------------
 * Why this file exists:
 * Wraps browser localStorage/sessionStorage queries safely, preventing crashes during SSR (Server Side Rendering) or mock checks.
 * 
 * Best Practices:
 * Encapsulates the keys inside constants and provides type-safe abstractions for token and user objects.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: any): void {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      if (!data) return null;
      
      // Attempt JSON parse or return string directly
      try {
        return JSON.parse(data) as T;
      } catch {
        return data as unknown as T;
      }
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing key from localStorage', e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }

  // Token helper methods
  setToken(token: string): void {
    this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  getToken(): string | null {
    return this.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
  }

  removeToken(): void {
    this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // User helper methods
  setUser(user: any): void {
    this.setItem(STORAGE_KEYS.USER_PROFILE, user);
  }

  getUser<T>(): T | null {
    return this.getItem<T>(STORAGE_KEYS.USER_PROFILE);
  }

  removeUser(): void {
    this.removeItem(STORAGE_KEYS.USER_PROFILE);
  }
}
