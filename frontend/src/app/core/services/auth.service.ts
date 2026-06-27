import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * AuthService
 * ----------------------------------------------------
 * Why this file exists:
 * Manages registration, authentication, token storage, role extraction, and logout.
 * 
 * Future Responsibilities (Phase 11):
 * - Send login/register requests to the backend Auth Service (`/api/auth/login`, `/api/auth/register`).
 * - Intercept expired JWT signatures and request refreshing.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() {
    // In Phase 1, HttpClient is configured but not invoked
  }

  login(credentials: any) {
    // Phase 11: Implement POST request to Gateway JWT authentication endpoint
  }

  register(userData: any) {
    // Phase 11: Implement POST request to registration endpoint
  }

  logout() {
    // Phase 11: Clear credentials, clean up user details from StorageService, and redirect to Home
  }

  isAuthenticated(): boolean {
    // Phase 11: Decode active token and verify expiration
    return false;
  }

  getUserRole(): string | null {
    // Phase 11: Extract 'role' claim from JWT payload
    return null;
  }
}
