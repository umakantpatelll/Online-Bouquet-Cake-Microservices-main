import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * ServerErrorComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Error 500 landing page for handling unhandled backend failures.
 */
@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 70vh;">
      <span class="material-icons text-danger opacity-75 mb-3" style="font-size: 8rem;">gpp_maybe</span>
      <h1 class="display-3 fw-bold font-outfit text-main mb-2">500</h1>
      <h2 class="h3 fw-bold mb-3">Internal Server Error</h2>
      <p class="text-muted-custom mb-4 max-width-400">Something went wrong on our servers. We are currently looking into the issue. Please try again later.</p>
      <a routerLink="/" class="btn custom-btn px-4 py-2">Back to Home</a>
    </div>
  `
})
export class ServerErrorComponent {}
