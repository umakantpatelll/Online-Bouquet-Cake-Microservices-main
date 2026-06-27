import { Pipe, PipeTransform } from '@angular/core';

/**
 * DurationPipe (Shared Formatting Pipe)
 * ----------------------------------------------------
 * Why this file exists:
 * Formats a duration in minutes to a readable format (e.g. 45 -> "45 mins").
 */
@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (minutes === null || minutes === undefined) return 'N/A';
    
    if (minutes < 60) {
      return `${minutes} mins`;
    }
    
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (mins === 0) {
      return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'}`;
    }
    
    return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'} ${mins} mins`;
  }
}
