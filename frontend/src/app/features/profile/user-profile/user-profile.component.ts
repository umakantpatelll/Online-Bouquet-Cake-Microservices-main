import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * UserProfileComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Displays user identity details and active roles.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5 d-flex justify-content-center">
      <div class="card card-theme p-4 shadow-sm" style="max-width: 500px; width: 100%;">
        <div class="text-center mb-4">
          <div class="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-3" style="width: 80px; height: 80px;">
            <span class="material-icons display-4">person</span>
          </div>
          <h2 class="fw-bold font-outfit text-main mb-1">{{ user().name }}</h2>
          <span class="badge bg-primary-subtle text-primary px-3 py-2 text-uppercase fw-semibold">{{ user().role }}</span>
        </div>
        
        <div class="border-top pt-3 d-flex flex-column gap-3">
          <div class="d-flex justify-content-between">
            <span class="text-muted-custom">Email Address</span>
            <span class="fw-semibold">{{ user().email }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="text-muted-custom">User ID</span>
            <span class="fw-semibold">#{{ user().id }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="text-muted-custom">Account Status</span>
            <span class="text-success fw-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserProfileComponent {
  user = signal({
    id: 29,
    name: 'Jane Customer',
    email: 'jane@cake.com',
    role: 'ROLE_CUSTOMER'
  });
}
