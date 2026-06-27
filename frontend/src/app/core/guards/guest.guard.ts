import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * guestGuard (Functional Route Guard)
 * ----------------------------------------------------
 * Why this file exists:
 * Prevents logged-in users from accessing credentials routes (login/register), 
 * redirecting them automatically to the landing page.
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        return true;
      }
      
      // User is already logged in, redirect to home page
      router.navigate(['/']);
      return false;
    })
  );
};
