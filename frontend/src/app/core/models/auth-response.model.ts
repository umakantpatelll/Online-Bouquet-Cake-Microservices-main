import { User } from './user.model';

/**
 * Outbound Response interfaces mapping backend response schemas.
 */

export interface AuthResponse {
  token: string;
  message: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_ADMIN';
  createdAt?: string;
}

/**
 * JWT Payload structure for decoding operations.
 */
export interface JwtPayload {
  sub: string;         // Subject (User email)
  roles?: string[];     // Array of authorities/roles
  role?: string;        // Fallback single role field
  exp: number;         // Expiration timestamp (seconds since epoch)
  iat?: number;        // Issued at timestamp
}
