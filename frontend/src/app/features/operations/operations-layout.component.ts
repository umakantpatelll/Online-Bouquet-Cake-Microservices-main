import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * OperationsLayoutComponent (Shell Layout Component)
 * ----------------------------------------------------
 * Why this file exists:
 * The shell page framework wraps all lazy-loaded operational center views, 
 * housing side panels and outlets.
 */
@Component({
  selector: 'app-operations-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './operations-layout.component.html',
  styleUrls: ['./operations-layout.component.scss']
})
export class OperationsLayoutComponent {}
