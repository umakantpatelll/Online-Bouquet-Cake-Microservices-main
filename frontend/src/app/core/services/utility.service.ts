import { Injectable } from '@angular/core';

/**
 * UtilityService
 * ----------------------------------------------------
 * Why this file exists:
 * Shared helper methods for data structures, formatting, or generic calculations.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  isNullOrEmpty(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
  }
}
