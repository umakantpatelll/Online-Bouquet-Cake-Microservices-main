import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

/**
 * UserProfileComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Fetches and displays the logged-in user's identity details.
 * 
 * Angular Features Used:
 * - Async Pipe (| async): Subscribes to `authService.currentUser$` observable and 
 *   automatically handles subscription clean up when component is destroyed.
 * 
 * Interview Tip:
 * The `async` pipe is a declarative template binder. It subscribes to an Observable or Promise 
 * and returns the latest value it has emitted. It is highly recommended because it automatically 
 * calls `unsubscribe()` internally to prevent memory leaks.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5 d-flex justify-content-center" style="min-height: 70vh;">
      <div class="card card-theme p-4 shadow-lg border-0" style="max-width: 500px; width: 100%; height: fit-content;">
        <ng-container *ngIf="authService.currentUser$ | async as user; else noUser">
          <div class="text-center mb-4">
            <div class="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary-color rounded-circle p-3 mb-3" style="width: 80px; height: 80px;">
              <span class="material-icons display-4">person</span>
            </div>
            <h2 class="fw-bold font-outfit text-main mb-1">{{ user.name }}</h2>
            <span class="badge bg-primary-subtle text-primary-color px-3 py-2 text-uppercase fw-semibold">{{ user.role }}</span>
          </div>
          
          <div class="border-top pt-4 d-flex flex-column gap-3">
            <div class="d-flex justify-content-between flex-wrap gap-2">
              <span class="text-muted-custom">Email Address</span>
              <span class="fw-semibold text-main">{{ user.email }}</span>
            </div>
            <div class="d-flex justify-content-between flex-wrap gap-2">
              <span class="text-muted-custom">User ID</span>
              <span class="fw-semibold text-main">#{{ user.id }}</span>
            </div>
            <div class="d-flex justify-content-between flex-wrap gap-2">
              <span class="text-muted-custom">Account Status</span>
              <span class="text-success fw-semibold">Active (Validated Session)</span>
            </div>
          </div>
        </ng-container>

        <ng-template #noUser>
          <div class="text-center py-4">
            <span class="material-icons text-muted opacity-50 display-1 mb-3">error_outline</span>
            <h3 class="fw-bold text-main mb-2">No Profile Found</h3>
            <p class="text-muted-custom">Please verify your session status.</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .text-primary-color {
      color: var(--primary-color) !important;
    }
    .card-theme {
      border-radius: var(--border-radius-md);
    }
  `]
})
export class UserProfileComponent {
  authService = inject(AuthService);
}
