import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { LoginRequest, RegisterRequest } from '../models/auth-request.model';
import { AuthResponse, UserResponse, JwtPayload } from '../models/auth-response.model';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';

/**
 * AuthService
 * ----------------------------------------------------
 * Why this file exists:
 * Manages reactive user sessions, token verification, login/logout transitions, 
 * and connects with Spring Boot security endpoints.
 * 
 * RxJS Operators Used:
 * 1. BehaviorSubject: Holds the active state and broadcasts it immediately to new subscribers.
 * 2. tap: Executes side-effects (e.g. caching token/profile in storage) without altering stream data.
 * 3. catchError: Gracefully catches HTTP errors and passes them down or redirects flows.
 * 4. switchMap: Dynamically switches the outer stream to a new inner Observable (e.g. login -> fetch profile).
 * 
 * JWT & Spring Boot Integration:
 * - Login generates a JWT. Angular stores the token in LocalStorage.
 * - The JWT payload is decoded using base64 decoding (`atob`) to obtain claims like user email and expiration timestamp.
 * - Sets a timer for auto-logout when the token expires.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  private readonly API_URL = `${environment.apiGatewayUrl}/api/auth`;

  // Reactive state management subjects
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  // Angular Signals foundation support (matches modern state approaches)
  public currentUserSignal = signal<User | null>(null);

  // Reference for session auto-logout timeout
  private autoLogoutTimer: any;

  constructor() {
    this.autoLogin();
  }

  /**
   * Registers a new customer or admin.
   */
  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/register`, request).pipe(
      tap(res => {
        if (res.success && res.data.token) {
          this.handleAuthSuccess(res.data.token);
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Performs authentication and chains profile retrieval using switchMap.
   */
  login(request: LoginRequest): Observable<ApiResponse<UserResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/login`, request).pipe(
      tap(res => {
        if (res.success && res.data.token) {
          this.handleAuthSuccess(res.data.token);
        }
      }),
      switchMap(() => this.fetchProfile()),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Retrieves full profile details from the backend.
   */
  fetchProfile(): Observable<ApiResponse<UserResponse>> {
    return this.http.get<ApiResponse<UserResponse>>(`${this.API_URL}/profile`).pipe(
      tap(res => {
        if (res.success) {
          const user: User = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role
          };
          this.storageService.setUser(user);
          this.currentUserSubject.next(user);
          this.currentUserSignal.set(user);
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Cleans up local credentials and redirects to login path.
   */
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Validates target token status against Spring Boot validation gateway endpoint.
   */
  validateTokenOnServer(token: string): Observable<boolean> {
    return this.http.get<ApiResponse<boolean>>(`${this.API_URL}/validate?token=${token}`).pipe(
      map(res => res.success && res.data === true),
      catchError(() => of(false))
    );
  }

  /**
   * Decodes JWT token client-side without external dependencies.
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const decodedJson = atob(payloadBase64);
      return JSON.parse(decodedJson) as JwtPayload;
    } catch {
      return null;
    }
  }

  /**
   * Restores user state from storage on app restart (auto-login).
   */
  private autoLogin(): void {
    const token = this.storageService.getToken();
    const savedUser = this.storageService.getUser<User>();

    if (!token || !savedUser) {
      this.clearAuthData();
      return;
    }

    const payload = this.decodeToken(token);
    if (!payload || this.isTokenExpired(payload.exp)) {
      this.clearAuthData();
      return;
    }

    // Set active subjects
    this.currentUserSubject.next(savedUser);
    this.currentUserSignal.set(savedUser);
    this.isLoggedInSubject.next(true);
    this.userRoleSubject.next(savedUser.role);

    // Re-verify session timer
    const remainingTime = (payload.exp * 1000) - Date.now();
    this.setupAutoLogout(remainingTime);
  }

  private handleAuthSuccess(token: string): void {
    this.storageService.setToken(token);
    this.isLoggedInSubject.next(true);
    
    const payload = this.decodeToken(token);
    if (payload) {
      // Set role from token payload (claims can be mapped to roles or role)
      const role = payload.roles && payload.roles.length > 0 ? payload.roles[0] : (payload.role || 'ROLE_CUSTOMER');
      this.userRoleSubject.next(role);

      const remainingTime = (payload.exp * 1000) - Date.now();
      this.setupAutoLogout(remainingTime);
    }
  }

  private isTokenExpired(expTimestamp: number): boolean {
    // exp is in seconds, convert Date.now() to seconds
    return Date.now() >= expTimestamp * 1000;
  }

  private setupAutoLogout(durationMs: number): void {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    
    if (durationMs <= 0) {
      this.logout();
      return;
    }

    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
      console.warn('User session expired. Auto-logout triggered.');
    }, durationMs);
  }

  private clearAuthData(): void {
    this.storageService.removeToken();
    this.storageService.removeUser();
    this.currentUserSubject.next(null);
    this.currentUserSignal.set(null);
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);

    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }
}
