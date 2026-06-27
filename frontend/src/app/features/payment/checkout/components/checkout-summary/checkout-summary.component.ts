import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CheckoutSummaryComponent (Presentational Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Sidebar recap panel displayed during checkout steps.
 */
@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss']
})
export class CheckoutSummaryComponent {
  @Input({ required: true }) subtotal: number = 0;
  @Input({ required: true }) discount: number = 0;
  @Input({ required: true }) appliedCoupon: string | null = null;
  @Input({ required: true }) discountPercentage: number = 0;

  get tax(): number {
    return (this.subtotal - this.discount) * 0.05;
  }

  get deliveryFee(): number {
    const netAmount = this.subtotal - this.discount;
    if (netAmount === 0 || netAmount >= 500) {
      return 0;
    }
    return 50;
  }

  get grandTotal(): number {
    return (this.subtotal - this.discount) + this.tax + this.deliveryFee;
  }
}
