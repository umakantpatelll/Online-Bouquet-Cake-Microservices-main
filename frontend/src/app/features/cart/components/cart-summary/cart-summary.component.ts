import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * CartSummaryComponent (Presentational Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Sticky sidebar panel executing cart tax calculations, delivery fees additions, 
 * coupon validations, and checkout triggers.
 */
@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Input({ required: true }) subtotal: number = 0;
  @Input({ required: true }) discount: number = 0;
  @Input({ required: true }) appliedCoupon: string | null = null;
  @Input({ required: true }) discountPercentage: number = 0;

  @Output() applyCoupon = new EventEmitter<string>();
  @Output() removeCoupon = new EventEmitter<void>();
  @Output() checkout = new EventEmitter<void>();

  couponCode: string = '';

  // 5% GST tax calculation
  get tax(): number {
    return (this.subtotal - this.discount) * 0.05;
  }

  // Free delivery for orders over ₹500
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

  onApply(): void {
    if (this.couponCode.trim()) {
      this.applyCoupon.emit(this.couponCode.trim());
      this.couponCode = '';
    }
  }
}
