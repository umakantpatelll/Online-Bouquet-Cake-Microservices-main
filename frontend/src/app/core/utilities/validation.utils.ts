/**
 * Validation Utility Class
 * ----------------------------------------------------
 * Why this file exists:
 * Houses standard regular expressions and pattern checking functions for email/passwords.
 */
export class ValidationUtils {
  
  private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static readonly PHONE_REGEX = /^[0-9]{10}$/;

  static isValidEmail(email: string): boolean {
    if (!email) return false;
    return this.EMAIL_REGEX.test(email);
  }

  static isValidPhone(phone: string): boolean {
    if (!phone) return false;
    return this.PHONE_REGEX.test(phone);
  }
}
