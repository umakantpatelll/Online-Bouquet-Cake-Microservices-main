/**
 * Development environment configuration.
 * Used during local development (running `ng serve`).
 * Points to localhost services like our API Gateway running on port 9090.
 */
export const environment = {
  production: false,
  appName: 'Online Bouquet & Cake Ordering System (DEV)',
  apiGatewayUrl: 'http://localhost:9090', // Local API Gateway Port
  tokenKey: 'auth_token',
  requestTimeout: 10000,                  // 10 seconds timeout for local dev
  defaultPageSize: 10
};
