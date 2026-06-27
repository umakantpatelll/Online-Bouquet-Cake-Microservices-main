import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../../core/models/cart-item.model';
import { ShippingAddress } from '../../../../../core/models/checkout.model';

/**
 * OrderReviewComponent (Presentational Form Step Component)
 * ----------------------------------------------------
 * Why this file exists:
 * The final review panel displaying items list, pricing summary, 
 * validated shipping details, and mock payment method selection.
 */
@Component({
  selector: 'app-order-review',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent {
  @Input({ required: true }) items: CartItem[] = [];
  @Input({ required: true }) subtotal: number = 0;
  @Input({ required: true }) discount: number = 0;
  @Input({ required: true }) appliedCoupon: string | null = null;
  @Input({ required: true }) discountPercentage: number = 0;
  @Input({ required: true }) shippingAddress!: ShippingAddress;
  @Input({ required: true }) paymentMethod: string = '';
  @Input() submitDisabled: boolean = false;

  @Output() submit = new EventEmitter<void>();

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

  getPaymentLabel(method: string): string {
    switch (method) {
      case 'CREDIT_DEBIT_CARD':
        return 'Credit / Debit Card (Mock)';
      case 'UPI':
        return 'UPI / NetBanking (Mock)';
      case 'CASH_ON_DELIVERY':
        return 'Cash on Delivery (COD)';
      default:
        return 'Not Selected';
    }
  }
}
