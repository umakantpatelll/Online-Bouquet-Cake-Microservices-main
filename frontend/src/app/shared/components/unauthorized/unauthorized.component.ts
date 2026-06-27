import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * UnauthorizedComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Error 401/403 landing page for unauthorized access boundaries.
 */
@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 70vh;">
      <span class="material-icons text-warning opacity-75 mb-3" style="font-size: 8rem;">lock_outline</span>
      <h1 class="display-3 fw-bold font-outfit text-main mb-2">401</h1>
      <h2 class="h3 fw-bold mb-3">Access Unauthorized</h2>
      <p class="text-muted-custom mb-4 max-width-400">You do not have permission to view this resource. Please make sure you are logged in with correct privileges.</p>
      <div class="d-flex gap-3">
        <a routerLink="/auth/login" class="btn custom-btn px-4 py-2">Sign In</a>
        <a routerLink="/" class="btn custom-btn-outline px-4 py-2">Back to Home</a>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}
