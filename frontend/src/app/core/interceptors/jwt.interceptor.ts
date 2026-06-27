import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

/**
 * jwtInterceptor (Functional HTTP Interceptor)
 * ----------------------------------------------------
 * Why this file exists:
 * Automatically injects the client's JWT token into the header of every secured request 
 * before it leaves the browser.
 * 
 * Angular 17 Feature:
 * Implemented as a functional interceptor (`HttpInterceptorFn`) instead of class-based interceptors. 
 * Allows injecting services directly inside the function using `inject()`.
 * 
 * Best Practices:
 * 1. Clone the request object (since HTTP requests are immutable).
 * 2. Only inject the token if available.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getToken();

  // Exclude public endpoints if required, although Spring Security Gateway handles public routes anyway
  const isAuthRequest = req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register');

  if (token && !isAuthRequest) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
