import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * OrderStatusChipComponent (Shared Presentational Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Standalone badge component to display order/payment status text with appropriate styling.
 */
@Component({
  selector: 'app-order-status-chip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge border rounded-pill px-3 py-1.5 font-outfit text-uppercase text-xs" [ngClass]="badgeClass">
      {{ statusLabel }}
    </span>
  `,
  styles: [`
    .font-outfit {
      font-family: 'Outfit', sans-serif;
    }
    .text-xs {
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  `]
})
export class OrderStatusChipComponent {
  @Input({ required: true }) status: string = 'PENDING';

  get statusLabel(): string {
    return this.status.replace(/_/g, ' ');
  }

  get badgeClass(): string {
    switch (this.status.toUpperCase()) {
      case 'PENDING':
        return 'bg-warning-subtle text-warning border-warning-subtle';
      case 'CONFIRMED':
        return 'bg-info-subtle text-info border-info-subtle';
      case 'PREPARING':
        return 'bg-primary-subtle text-primary border-primary-subtle';
      case 'OUT_FOR_DELIVERY':
        return 'bg-secondary-subtle text-secondary border-secondary-subtle';
      case 'DELIVERED':
        return 'bg-success-subtle text-success border-success-subtle';
      case 'CANCELLED':
        return 'bg-danger-subtle text-danger border-danger-subtle';
      default:
        return 'bg-light-subtle text-dark border-light-subtle';
    }
  }
}
