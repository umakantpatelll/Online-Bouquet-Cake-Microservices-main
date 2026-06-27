/**
 * User Interface
 * ----------------------------------------------------
 * Why this file exists:
 * Models user details returned upon authentication or profile retrieval.
 * Matches Auth Service DTO fields.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_ADMIN';
  createdAt?: string;
}
