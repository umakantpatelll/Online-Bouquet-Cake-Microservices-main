import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * HasRoleDirective (Structural Security Directive)
 * ----------------------------------------------------
 * Why this file exists:
 * Dynamically includes or excludes DOM templates based on the logged-in user's roles.
 * Usage: `*appHasRole="['ROLE_ADMIN']"`
 * 
 * Angular Concepts:
 * 1. TemplateRef: Reference to the nested HTML markup block to render.
 * 2. ViewContainerRef: Anchor pointer in the DOM to insert/clear views.
 * 
 * Interview Tip:
 * Structural directives are prefixed with an asterisk (*) in templates. Internally, 
 * Angular wraps the element in an `<ng-template>` tag, injecting `TemplateRef` and 
 * `ViewContainerRef` into the directive class to control structural layout injection.
 */
@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);

  private expectedRoles: string[] = [];
  private authSub?: Subscription;
  private isViewCreated = false;

  @Input('appHasRole') set roles(val: string[]) {
    this.expectedRoles = val || [];
    this.updateView();
  }

  ngOnInit(): void {
    this.authSub = this.authService.currentUser$.subscribe(() => {
      this.updateView();
    });
  }

  private updateView(): void {
    const user = this.authService.currentUserSignal();
    const userRole = user?.role || '';

    // Check if user role matches expected roles criteria
    const hasRole = this.expectedRoles.length === 0 || this.expectedRoles.includes(userRole);

    if (hasRole && !this.isViewCreated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isViewCreated = true;
    } else if (!hasRole && this.isViewCreated) {
      this.viewContainer.clear();
      this.isViewCreated = false;
    }
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
