import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CustomValidators } from '../../../core/utilities/custom-validators';

/**
 * LoginComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The user credentials portal to request authorization from our Spring Boot gateway.
 * 
 * Angular & Form Features:
 * 1. Reactive Forms: Strong, programmatic form controls structure with synchronous validator life-cycles.
 * 2. Standalone Component: Declares imports explicitly (`ReactiveFormsModule`, Material modules, and spinners).
 * 3. FormBuilder: Helper utility to group form fields with validators.
 */
@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm: FormGroup;
  hidePassword = signal(true);
  
  // Return URL route to redirect back to after signing in
  private returnUrl: string = '/';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, CustomValidators.noWhitespace]],
      password: ['', [Validators.required, CustomValidators.noWhitespace]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Easy form control getters
  get f() { return this.loginForm.controls; }

  togglePasswordVisibility(): void {
    this.hidePassword.update(val => !val);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.spinner.show();
    const loginPayload = this.loginForm.value;

    this.authService.login(loginPayload).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.notificationService.showSuccess(res.message || 'Login Successful', 'Welcome!');
        this.router.navigateByUrl(this.returnUrl);
      },
      error: () => {
        this.spinner.hide();
        // Error messages are already popped up in global errorInterceptor
      }
    });
  }
}
