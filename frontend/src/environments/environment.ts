/**
 * Production environment configuration.
 * Used when running `ng build` for production deployment.
 * Extends the codebase with environment-specific variables.
 * Best Practice: Keep credentials and secrets OUT of this file. Use environment variable injection during CI/CD if needed.
 */
export const environment = {
  production: true,
  appName: 'Online Bouquet & Cake Ordering System',
  apiGatewayUrl: 'http://localhost:9090', // Local API Gateway Port
  tokenKey: 'auth_token',                       // Local storage key for storing JWT
  requestTimeout: 15000,                        // Global request timeout in ms
  defaultPageSize: 10
};
