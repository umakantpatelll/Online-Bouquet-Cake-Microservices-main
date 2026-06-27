import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/**
 * authGuard (Functional Route Guard)
 * ----------------------------------------------------
 * Why this file exists:
 * Restricts access to secured customer pages (profile, cart, orders) to authenticated users.
 * 
 * Angular 17 Feature:
 * Functional guards (`CanActivateFn`) are the modern standard. They inject services 
 * using `inject()` directly inside the function scope, removing class boilerplate.
 * 
 * RxJS Operators:
 * - `take(1)`: Completes the observable stream after receiving the first status value 
 *   to prevent route changes from hanging on active state changes.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      
      notificationService.showWarning('Please sign in to access this page.', 'Access Denied');
      router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  );
};
