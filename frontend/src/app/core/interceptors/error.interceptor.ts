import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/**
 * errorInterceptor (Functional HTTP Interceptor)
 * ----------------------------------------------------
 * Why this file exists:
 * Handles incoming API errors globally, parsing backend `ApiResponse` payloads 
 * and popping up Toastr warning alerts.
 * 
 * Target Actions:
 * - 401: Clean user state in AuthService, redirect to login page, and show error.
 * - 403: Redirect to unauthorized page.
 * - 500 / Network outages: Show error toast.
 * 
 * RxJS Operator Used:
 * - `catchError`: Intercepts failures inside the observable pipe, allowing clean recovery 
 *   or custom transformations of the error.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network Error: ${error.error.message}`;
      } else {
        // Server-side response error
        // Attempt to extract standard envelope error message: error.error.message or error.message
        if (error.error && typeof error.error === 'object') {
          errorMessage = error.error.message || error.error.error || errorMessage;
        } else {
          errorMessage = `Error Code ${error.status}: ${error.statusText}`;
        }

        switch (error.status) {
          case 401:
            // Auto logout if 401 is received from a secured request
            if (!req.url.includes('/api/auth/login')) {
              authService.logout();
              notificationService.showError('Session expired. Please login again.', 'Unauthorized');
            } else {
              notificationService.showError('Invalid email or password.', 'Login Failed');
            }
            break;

          case 403:
            notificationService.showError('You do not have privilege to access this page.', 'Access Denied');
            router.navigate(['/unauthorized']);
            break;

          case 404:
            // Let the calling component handle 404s if appropriate, otherwise show toast
            notificationService.showWarning(errorMessage, 'Not Found');
            break;

          case 500:
            notificationService.showError('Internal server error. Please try again later.', 'Server Error');
            router.navigate(['/server-error']);
            break;

          default:
            notificationService.showError(errorMessage, 'Request Failed');
            break;
        }
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
