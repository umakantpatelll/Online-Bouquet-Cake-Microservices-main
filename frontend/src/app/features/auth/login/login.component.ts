import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * LoginComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Serves as the page where users can input their email and password to request a JWT token.
 * 
 * Angular Features Used:
 * 1. Standalone Component: All elements are locally loaded.
 * 
 * Interview Tip:
 * Angular features Lazy Loading using dynamic imports (`loadComponent: () => import(...)`).
 * This reduces the initial bundle size, downloading the components only when the user visits the route.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5 d-flex justify-content-center align-items-center" style="min-height: 70vh;">
      <div class="card card-theme p-4 shadow-sm" style="max-width: 450px; width: 100%;">
        <h2 class="text-center fw-bold font-outfit mb-3">Welcome Back</h2>
        <p class="text-center text-muted-custom mb-4">Login to order fresh cakes & bouquets.</p>
        <div class="alert alert-info py-2" role="alert">
          <i class="bi bi-info-circle-fill"></i> Auth API integration will be implemented in Phase 11.
        </div>
        <form>
          <div class="mb-3">
            <label class="form-label fw-semibold">Email address</label>
            <input type="email" class="form-control" placeholder="name@example.com" disabled>
          </div>
          <div class="mb-4">
            <label class="form-label fw-semibold">Password</label>
            <input type="password" class="form-control" placeholder="••••••••" disabled>
          </div>
          <button type="submit" class="btn custom-btn w-100 py-2 mb-3" disabled>Sign In</button>
        </form>
        <div class="text-center mt-3">
          <span class="text-muted-custom">Don't have an account?</span>
          <a routerLink="/auth/register" class="btn btn-link text-primary-color text-decoration-none fw-semibold p-0 ms-1">Register</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {}
