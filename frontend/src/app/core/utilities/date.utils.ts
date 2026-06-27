/**
 * Date Utility Class
 * ----------------------------------------------------
 * Why this file exists:
 * Offers stateless functions to format date objects consistently across components.
 */
export class DateUtils {
  
  /**
   * Formats ISO string into standard Indian locale date representation.
   */
  static formatToLocale(dateString: string | Date): string {
    if (!dateString) return '';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Formats ISO string into full date time description.
   */
  static formatToLocaleDateTime(dateString: string | Date): string {
    if (!dateString) return '';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
