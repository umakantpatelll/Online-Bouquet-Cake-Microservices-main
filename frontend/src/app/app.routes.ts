import { Routes } from '@angular/router';

/**
 * Routing Configuration File (app.routes.ts)
 * ----------------------------------------------------
 * Why this file exists:
 * It defines the application's URL paths and maps them to their respective components.
 * 
 * Angular Features Used:
 * 1. Lazy Loading (loadComponent): Dynamic imports load the component bundle ONLY when the route is matched.
 * 2. Wildcard Route (**): Catches any unregistered URL and redirects to the 404 Error Page.
 * 
 * Best Practices:
 * 1. Use relative imports for local paths.
 * 2. Order routes logically (specific paths first, generic/wildcard paths last).
 * 3. Keep business logic separate from routing declarations.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home | Online Bouquet & Cake Ordering'
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Login | Online Bouquet & Cake Ordering'
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    title: 'Register | Online Bouquet & Cake Ordering'
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent),
    title: 'Cakes & Bouquets Collection'
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    title: 'Product Details'
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    title: 'Your Shopping Cart'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/payment/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Secure Checkout'
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent),
    title: 'Your Orders'
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/user-profile/user-profile.component').then(m => m.UserProfileComponent),
    title: 'User Profile'
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    title: 'Admin Dashboard'
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent),
    title: 'Unauthorized Access'
  },
  {
    path: 'server-error',
    loadComponent: () => import('./shared/components/server-error/server-error.component').then(m => m.ServerErrorComponent),
    title: 'Server Error'
  },
  {
    path: '404',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
