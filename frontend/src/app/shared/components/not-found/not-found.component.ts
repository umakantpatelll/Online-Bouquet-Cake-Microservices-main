import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * NotFoundComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Error 404 landing page for handling unmapped routes dynamically.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 70vh;">
      <span class="material-icons text-muted opacity-50 mb-3" style="font-size: 8rem;">error_outline</span>
      <h1 class="display-3 fw-bold font-outfit text-main mb-2">404</h1>
      <h2 class="h3 fw-bold mb-3">Page Not Found</h2>
      <p class="text-muted-custom mb-4 max-width-400">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <a routerLink="/" class="btn custom-btn px-4 py-2">Back to Home</a>
    </div>
  `
})
export class NotFoundComponent {}
