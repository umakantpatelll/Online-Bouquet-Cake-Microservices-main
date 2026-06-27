import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * LoadingSpinnerComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Reusable full-screen or inline spinner to overlay long-running async queries.
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div *ngIf="visible" [ngClass]="{ 'fullscreen-overlay': fullscreen }" class="d-flex flex-column align-items-center justify-content-center">
      <mat-spinner diameter="50" color="primary"></mat-spinner>
      <p *ngIf="message" class="text-muted-custom mt-3 fw-semibold">{{ message }}</p>
    </div>
  `,
  styles: [`
    .fullscreen-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(var(--bg-color), 0.7);
      backdrop-filter: blur(4px);
      z-index: 9999;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() visible: boolean = true;
  @Input() fullscreen: boolean = false;
  @Input() message?: string = 'Loading...';
}
