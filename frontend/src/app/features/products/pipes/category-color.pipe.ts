import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../../core/models/product.model';

/**
 * CategoryColorPipe
 * ----------------------------------------------------
 * Why this file exists:
 * Dynamically resolves Bootstrap badge style classes for different categories.
 */
@Pipe({
  name: 'categoryColor',
  standalone: true,
  pure: true
})
export class CategoryColorPipe implements PipeTransform {
  transform(category: Category | string): string {
    switch (category) {
      case 'CAKE':
        return 'bg-danger-subtle text-danger border-danger-subtle';
      case 'BOUQUET':
        return 'bg-success-subtle text-success border-success-subtle';
      case 'GIFT':
        return 'bg-warning-subtle text-warning border-warning-subtle';
      case 'COMBO':
        return 'bg-info-subtle text-info border-info-subtle';
      default:
        return 'bg-secondary-subtle text-secondary border-secondary-subtle';
    }
  }
}
