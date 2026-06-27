import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom Validators Class
 * ----------------------------------------------------
 * Why this file exists:
 * Houses custom verification functions for Angular Reactive Forms.
 * 
 * Angular Features Used:
 * - ValidatorFn / AbstractControl: Interfaces matching Angular form validation pipeline.
 * 
 * Best Practices:
 * 1. Return `null` when valid, and a key-value object when invalid (e.g. `{ strength: true }`).
 * 2. Keep validations pure and sync.
 */
export class CustomValidators {

  /**
   * Validates that field does not contain only spaces.
   */
  static noWhitespace(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  /**
   * Validates password complexity: Min 8 chars, 1 uppercase, 1 lowercase, 1 number.
   */
  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null; // Let 'required' validator handle empty fields

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const isLengthValid = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isLengthValid;
      return passwordValid ? null : {
        passwordStrength: {
          hasUpperCase,
          hasLowerCase,
          hasNumeric,
          isLengthValid
        }
      };
    };
  }

  /**
   * Cross-field validator ensuring matching controls (e.g. password and confirmPassword).
   */
  static mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control;
      const mainControl = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!mainControl || !matchingControl) return null;

      // Skip validating matching if other error exists
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (mainControl.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }
}
