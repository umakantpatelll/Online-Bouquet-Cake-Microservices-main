import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

/**
 * CartComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Root view container for the shopping cart module.
 * Subscribes to CartService state and coordinates item adjustments.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EmptyCartComponent,
    CartItemComponent,
    CartSummaryComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  // Observable bindings for template async pipe subscription
  cartItems$ = this.cartService.cartItems$;
  subtotal$ = this.cartService.cartSubtotal$;
  discount$ = this.cartService.discountAmount$;
  appliedCoupon$ = this.cartService.appliedCoupon$;
  discountPercentage$ = this.cartService.discountPercentage$;

  trackByProductId(index: number, item: CartItem): number {
    return item.product.id;
  }

  onIncrease(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  onDecrease(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  onRemove(item: CartItem): void {
    this.cartService.removeItem(item.product.id);
  }

  onApplyCoupon(code: string): void {
    this.cartService.applyCoupon(code);
  }

  onRemoveCoupon(): void {
    this.cartService.removeCoupon();
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
