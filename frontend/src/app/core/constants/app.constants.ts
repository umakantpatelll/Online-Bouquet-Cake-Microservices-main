/**
 * Application Constants (app.constants.ts)
 * ----------------------------------------------------
 * Why this file exists:
 * Consolidates all static, immutable values (endpoints, local storage keys, roles, and paths) 
 * in a single source of truth.
 * 
 * Best Practice:
 * Keeping constants externalized prevents "magic strings" in templates or service files, 
 * making it trivial to change paths, keys, or roles application-wide.
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me'
  },
  PRODUCTS: {
    BASE: '/api/products',
    BY_ID: (id: number) => `/api/products/${id}`
  },
  ORDERS: {
    BASE: '/api/orders',
    BY_ID: (id: number) => `/api/orders/${id}`,
    UPDATE_STATUS: (id: number) => `/api/orders/${id}/status`
  },
  PAYMENTS: {
    BASE: '/api/payments',
    BY_ID: (id: number) => `/api/payments/${id}`
  },
  DELIVERIES: {
    BASE: '/api/deliveries',
    BY_ID: (id: number) => `/api/deliveries/${id}`
  }
};

export const APP_CONSTANTS = {
  NAME: 'Online Bouquet & Cake Ordering',
  VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'en'
};

export const ROUTE_PATHS = {
  HOME: '',
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  PRODUCTS: 'products',
  PRODUCT_DETAILS: 'products/:id',
  CART: 'cart',
  CHECKOUT: 'checkout',
  ORDERS: 'orders',
  PROFILE: 'profile',
  ADMIN: 'admin',
  UNAUTHORIZED: 'unauthorized',
  SERVER_ERROR: 'server-error',
  NOT_FOUND: '404'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PROFILE: 'user_profile',
  THEME_MODE: 'app-theme'
};

export const USER_ROLES = {
  ADMIN: 'ROLE_ADMIN',
  CUSTOMER: 'ROLE_CUSTOMER'
};
