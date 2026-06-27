import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CustomValidators } from '../../../core/utilities/custom-validators';

/**
 * RegisterComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Form registry boundary for new customers or admin users.
 * 
 * Form validation:
 * - Checks password complexity.
 * - Asserts cross-field equality between password and confirmPassword.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgxSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);

  registerForm: FormGroup;
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, CustomValidators.noWhitespace]],
      email: ['', [Validators.required, Validators.email, CustomValidators.noWhitespace]],
      password: ['', [Validators.required, CustomValidators.passwordStrength()]],
      confirmPassword: ['', [Validators.required]],
      role: ['ROLE_CUSTOMER', [Validators.required]]
    }, {
      validators: [CustomValidators.mustMatch('password', 'confirmPassword')]
    });
  }

  get f() { return this.registerForm.controls; }

  togglePasswordVisibility(): void {
    this.hidePassword.update(val => !val);
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword.update(val => !val);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.spinner.show();
    const registerPayload = this.registerForm.value;

    this.authService.register(registerPayload).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.notificationService.showSuccess(res.message || 'Registration Successful', 'Registration Success');
        this.router.navigate(['/']);
      },
      error: () => {
        this.spinner.hide();
        // Errors are already handled by global errorInterceptor
      }
    });
  }
}
