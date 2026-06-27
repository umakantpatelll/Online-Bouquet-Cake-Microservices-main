import { Pipe, PipeTransform } from '@angular/core';

/**
 * RelativeTimePipe (Shared Formatting Pipe)
 * ----------------------------------------------------
 * Why this file exists:
 * Standalone pipe transforming date strings into relative descriptive tags (e.g. "2 mins ago").
 */
@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string | Date | number): string {
    if (!value) return 'N/A';

    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSecs < 30) {
      return 'Just now';
    } else if (diffSecs < 60) {
      return `${diffSecs}s ago`;
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  }
}
