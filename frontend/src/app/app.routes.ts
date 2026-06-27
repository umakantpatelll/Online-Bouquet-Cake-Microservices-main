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
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home | Online Bouquet & Cake Ordering'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    title: 'User Dashboard'
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
    path: 'orders/:id',
    loadComponent: () => import('./features/orders/order-details/order-details.component').then(m => m.OrderDetailsComponent),
    canActivate: [authGuard],
    title: 'Order Tracking Details'
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/user-profile/user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [authGuard],
    title: 'User Profile'
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
    title: 'Admin Panel',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        title: 'Admin Dashboard'
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/products/product-list.component').then(m => m.ProductListComponent),
        title: 'Manage Products'
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/orders/admin-order-list.component').then(m => m.AdminOrderListComponent),
        title: 'Manage Orders'
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/user-list.component').then(m => m.UserListComponent),
        title: 'Manage Users'
      },
      {
        path: 'payments',
        loadComponent: () => import('./features/admin/payments/payment-list.component').then(m => m.AdminPaymentListComponent),
        title: 'Payment Settlements'
      },
      {
        path: 'deliveries',
        loadComponent: () => import('./features/admin/deliveries/delivery-list.component').then(m => m.DeliveryListComponent),
        title: 'Delivery Logistics'
      }
    ]
  },
  {
    path: 'operations',
    loadComponent: () => import('./features/operations/operations-layout.component').then(m => m.OperationsLayoutComponent),
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
    title: 'Operations Center',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/operations/dashboard/operations-dashboard.component').then(m => m.OperationsDashboardComponent),
        title: 'Operations Dashboard'
      },
      {
        path: 'tracking',
        loadComponent: () => import('./features/operations/tracking/realtime-tracking.component').then(m => m.RealtimeTrackingComponent),
        title: 'Live Shipment Tracking'
      },
      {
        path: 'kafka',
        loadComponent: () => import('./features/operations/kafka/kafka-visualization.component').then(m => m.KafkaVisualizationComponent),
        title: 'Kafka Event Stream'
      },
      {
        path: 'audit',
        loadComponent: () => import('./features/operations/audit/audit-logs.component').then(m => m.AuditLogsComponent),
        title: 'Compliance Audit Logs'
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/operations/reports/reports.component').then(m => m.ReportsComponent),
        title: 'Business Reports'
      }
    ]
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
