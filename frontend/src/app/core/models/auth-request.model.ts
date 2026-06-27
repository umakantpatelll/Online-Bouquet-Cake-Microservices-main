/**
 * Inbound Request DTO structures mapping to the backend gateway authentication routes.
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_ADMIN';
}
