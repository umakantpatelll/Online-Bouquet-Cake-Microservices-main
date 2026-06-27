/**
 * String Utility Class
 * ----------------------------------------------------
 * Why this file exists:
 * Shared string manipulators like truncating long text or capitalizing words.
 */
export class StringUtils {
  
  static truncate(str: string, maxLength: number): string {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }

  static capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
