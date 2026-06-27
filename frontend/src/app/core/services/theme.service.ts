import { Injectable, signal, effect } from '@angular/core';

/**
 * ThemeService
 * ----------------------------------------------------
 * Why this file exists:
 * Manages the color theme (light vs dark mode) of the application, syncing state to LocalStorage.
 * 
 * Angular Features Used:
 * 1. Signals (signal): High-performance reactive primitive representing the current theme mode.
 * 2. Effects (effect): Automatically executes a side effect whenever the reactive signal changes.
 * 
 * Interview Tip:
 * Effects are run inside a reactive context. Angular tracks any signal read inside the effect 
 * and automatically re-evaluates the effect when that signal updates. Never write to signals 
 * inside an effect (unless allowed explicitly) to prevent infinite change detection loops.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  
  // Theme state signal (defaults to light or loaded value)
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    this.loadTheme();

    // Effect triggers DOM updates automatically when signal updates
    effect(() => {
      const currentTheme = this.theme();
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem(this.THEME_KEY, currentTheme);
    });
  }

  toggleTheme() {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  private loadTheme() {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      this.theme.set(saved);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }
  }
}
