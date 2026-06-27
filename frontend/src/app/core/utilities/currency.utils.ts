/**
 * Currency Utility Class
 * ----------------------------------------------------
 * Why this file exists:
 * Formats price numeric amounts to Indian Rupees (INR) format.
 */
export class CurrencyUtils {
  
  /**
   * Formats a raw number value into INR currency syntax.
   */
  static formatToINR(value: number): string {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  }
}
