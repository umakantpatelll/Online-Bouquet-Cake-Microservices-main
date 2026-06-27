import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/**
 * roleGuard (Functional Route Guard)
 * ----------------------------------------------------
 * Why this file exists:
 * Restricts access to administrator views (e.g., admin dashboard) based on explicit user authority.
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'] || 'ROLE_ADMIN';

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user && user.role === expectedRole) {
        return true;
      }
      
      notificationService.showError('Access denied. Admin authorization is required.', 'Unauthorized');
      router.navigate(['/unauthorized']);
      return false;
    })
  );
};
