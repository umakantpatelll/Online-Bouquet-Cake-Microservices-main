import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme.service';

/**
 * NavbarComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes the main navigation header of the platform, including responsive menus and theme toggling.
 * 
 * Angular Features Used:
 * 1. Dependency Injection: ThemeService injected to manage light/dark modes.
 * 2. Signals: Injected theme signals and mobile menu toggle signals.
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
  
  // Responsive menu state signal
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
