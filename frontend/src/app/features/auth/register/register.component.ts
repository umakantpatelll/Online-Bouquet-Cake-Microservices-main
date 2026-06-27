import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * RegisterComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Form boundary for registering a new customer or admin user.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5 d-flex justify-content-center align-items-center" style="min-height: 70vh;">
      <div class="card card-theme p-4 shadow-sm" style="max-width: 480px; width: 100%;">
        <h2 class="text-center fw-bold font-outfit mb-3">Create Account</h2>
        <p class="text-center text-muted-custom mb-4">Join us to explore and order premium cakes and bouquets.</p>
        <div class="alert alert-info py-2" role="alert">
          <i class="bi bi-info-circle-fill"></i> Auth registration logic will be integrated in Phase 11.
        </div>
        <form>
          <div class="mb-3">
            <label class="form-label fw-semibold">Full Name</label>
            <input type="text" class="form-control" placeholder="John Doe" disabled>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Email address</label>
            <input type="email" class="form-control" placeholder="name@example.com" disabled>
          </div>
          <div class="mb-4">
            <label class="form-label fw-semibold">Password</label>
            <input type="password" class="form-control" placeholder="••••••••" disabled>
          </div>
          <button type="submit" class="btn custom-btn w-100 py-2 mb-3" disabled>Register</button>
        </form>
        <div class="text-center mt-3">
          <span class="text-muted-custom">Already have an account?</span>
          <a routerLink="/auth/login" class="btn btn-link text-primary-color text-decoration-none fw-semibold p-0 ms-1">Sign In</a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {}
