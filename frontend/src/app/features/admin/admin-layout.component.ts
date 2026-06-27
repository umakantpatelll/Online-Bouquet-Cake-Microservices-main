import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * AdminLayoutComponent (Shell Layout Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Acts as the master shell template for all admin child views.
 * Incorporates a responsive sidebar menu and injects child route modules.
 */
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {}
