import { Pipe, PipeTransform } from '@angular/core';

/**
 * PriceDiscountPipe
 * ----------------------------------------------------
 * Why this file exists:
 * Calculates a discounted price based on a percentage rate for display.
 * 
 * Angular Feature:
 * Implemented as a Pure Pipe (`pure: true` is default). Pure pipes only re-evaluate 
 * when their input references change, yielding excellent rendering performance.
 * 
 * Interview Tip:
 * A pure pipe is only executed when Angular detects a change to the input value (primitive change 
 * or reference change). Impure pipes run on every change detection cycle, which can severely 
 * impact performance if they execute expensive operations like arrays sorting or filtering.
 */
@Pipe({
  name: 'priceDiscount',
  standalone: true,
  pure: true
})
export class PriceDiscountPipe implements PipeTransform {
  transform(price: number, discountPercentage: number = 10): number {
    if (!price) return 0;
    const factor = (100 - discountPercentage) / 100;
    return price * factor;
  }
}
