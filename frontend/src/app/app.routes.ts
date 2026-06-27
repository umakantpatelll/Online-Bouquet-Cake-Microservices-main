import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { guestGuard } from './core/guards/guest.guard';

/**
 * Routing Configuration File (app.routes.ts)
 * ----------------------------------------------------
 * Why this file exists:
 * It defines the application's URL paths, maps them to standalone components, 
 * and applies route guards to protect paths.
 * 
 * Guards Registered:
 * 1. guestGuard: Restricts auth pages from logged-in sessions.
 * 2. authGuard: Restricts profile/orders/checkout from anonymous guest actions.
 * 3. roleGuard: Restricts access to Admin module to ROLE_ADMIN role owners only.
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
    canActivate: [guestGuard],
    title: 'Login | Online Bouquet & Cake Ordering'
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [guestGuard],
    title: 'Register | Online Bouquet & Cake Ordering'
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    canActivate: [guestGuard],
    title: 'Forgot Password | Online Bouquet & Cake Ordering'
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
    canActivate: [authGuard],
    title: 'Your Shopping Cart'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/payment/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard],
    title: 'Secure Checkout'
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent),
    canActivate: [authGuard],
    title: 'Your Orders'
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/user-profile/user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [authGuard],
    title: 'User Profile'
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
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
