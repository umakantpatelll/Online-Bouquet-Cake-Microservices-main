import { Pipe, PipeTransform } from '@angular/core';

/**
 * StockStatusPipe
 * ----------------------------------------------------
 * Why this file exists:
 * Maps raw stock quantity values to localized user-friendly descriptions.
 */
@Pipe({
  name: 'stockStatus',
  standalone: true,
  pure: true
})
export class StockStatusPipe implements PipeTransform {
  transform(stock: number): string {
    if (stock === undefined || stock === null || stock <= 0) {
      return 'Out of Stock';
    }
    if (stock < 5) {
      return `Only ${stock} left! (Low Stock)`;
    }
    return `In Stock (${stock} units)`;
  }
}
