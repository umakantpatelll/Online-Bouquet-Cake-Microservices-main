import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

/**
 * NavbarComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The main header navigation containing responsive routes, 
 * user identity displays, conditional role-based menus, and logout controls.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  cartCount$ = inject(CartService).cartCount$;
  
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onLogout(): void {
    this.authService.logout();
    this.isMobileMenuOpen.set(false);
  }
}
