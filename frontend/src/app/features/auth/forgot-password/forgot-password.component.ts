import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../core/services/notification.service';
import { CustomValidators } from '../../../core/utilities/custom-validators';

/**
 * ForgotPasswordComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Standalone page for requesting password recovery email (UI Placeholder).
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxSpinnerModule
  ],
  template: `
    <ngx-spinner bdColor="rgba(0, 0, 0, 0.6)" size="medium" color="#fff" type="ball-scale-multiple" [fullScreen]="true">
      <p style="color: white; font-weight: 500;">Processing request...</p>
    </ngx-spinner>

    <div class="forgot-wrapper container py-5 d-flex justify-content-center align-items-center" style="min-height: 75vh;">
      <div class="card card-theme p-4 p-md-5 shadow-lg border-0" style="max-width: 480px; width: 100%;">
        <div class="text-center mb-4">
          <div class="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary-color rounded-circle p-3 mb-3" style="width: 70px; height: 70px;">
            <span class="material-icons display-5">lock_reset</span>
          </div>
          <h2 class="fw-bold font-outfit text-main mb-1">Reset Password</h2>
          <p class="text-muted-custom">Enter your email and we'll send you recovery links.</p>
        </div>

        <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="d-flex flex-column gap-2">
          <!-- Email Field -->
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Email Address</mat-label>
            <input matInput type="email" formControlName="email" placeholder="name@example.com" autocomplete="email">
            <mat-icon matSuffix class="text-muted">email</mat-icon>
            
            <mat-error *ngIf="f['email'].errors?.['required']">Email is required.</mat-error>
            <mat-error *ngIf="f['email'].errors?.['email']">Please enter a valid email address.</mat-error>
            <mat-error *ngIf="f['email'].errors?.['whitespace']">Whitespace only is not allowed.</mat-error>
          </mat-form-field>

          <button type="submit" class="btn custom-btn w-100 py-3 shadow-sm mt-3" [disabled]="forgotForm.invalid">
            Send Reset Link
          </button>
        </form>

        <div class="text-center mt-4">
          <a routerLink="/auth/login" class="text-primary-color fw-bold text-decoration-none small">
            <i class="bi bi-arrow-left me-1"></i> Back to Login
          </a>
        </div>
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
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private spinner = inject(NgxSpinnerService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  forgotForm: FormGroup;

  constructor() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, CustomValidators.noWhitespace]]
    });
  }

  get f() { return this.forgotForm.controls; }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      return;
    }

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.notificationService.showInfo(
        `A password recovery link has been simulated for ${this.forgotForm.value.email}.`,
        'Simulation Info'
      );
      this.router.navigate(['/auth/login']);
    }, 1500);
  }
}
