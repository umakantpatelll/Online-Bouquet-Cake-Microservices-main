import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

/**
 * CartService
 * ----------------------------------------------------
 * Why this file exists:
 * Manages shopping cart state reactively across components.
 * Restores cart state on browser refresh from local storage.
 * Handles promo coupon calculations client-side.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageService = inject(StorageService);
  private notificationService = inject(NotificationService);

  private readonly CART_STORAGE_KEY = 'cart_items';
  private readonly COUPON_STORAGE_KEY = 'applied_coupon';

  // State subjects
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private appliedCouponSubject = new BehaviorSubject<string | null>(null);
  public appliedCoupon$ = this.appliedCouponSubject.asObservable();

  private discountPercentageSubject = new BehaviorSubject<number>(0);
  public discountPercentage$ = this.discountPercentageSubject.asObservable();

  // RxJS computed properties
  public cartCount$ = this.cartItems$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  public cartSubtotal$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
  );

  public discountAmount$ = this.cartSubtotal$.pipe(
    map(subtotal => {
      const percentage = this.discountPercentageSubject.value;
      return (subtotal * percentage) / 100;
    })
  );

  constructor() {
    this.loadCart();
  }

  /**
   * Adds a product to the cart with quantity limits checking.
   */
  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

    let targetQty = quantity;
    if (existingIndex > -1) {
      targetQty += currentItems[existingIndex].quantity;
    }

    // Verify stock availability
    if (targetQty > product.stock) {
      this.notificationService.showWarning(
        `Cannot add ${quantity} more item(s). Exceeds available stock of ${product.stock} units.`,
        'Inventory Limit'
      );
      // Cap at maximum stock
      targetQty = product.stock;
      if (existingIndex > -1 && currentItems[existingIndex].quantity === product.stock) {
        return; // Already capped
      }
    }

    const updatedItems = [...currentItems];
    if (existingIndex > -1) {
      updatedItems[existingIndex] = { ...updatedItems[existingIndex], quantity: targetQty };
    } else {
      updatedItems.push({ product, quantity: targetQty });
    }

    this.updateCartState(updatedItems);
    this.notificationService.showSuccess(`${product.name} added to cart.`, 'Cart Updated');
  }

  /**
   * Removes an item from the cart.
   */
  removeItem(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const targetItem = currentItems.find(item => item.product.id === productId);
    const updatedItems = currentItems.filter(item => item.product.id !== productId);

    this.updateCartState(updatedItems);
    if (targetItem) {
      this.notificationService.showInfo(`${targetItem.product.name} removed from cart.`, 'Cart Updated');
    }
  }

  /**
   * Updates purchasing quantity with validation checks.
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);

    if (itemIndex > -1) {
      const product = currentItems[itemIndex].product;
      let targetQty = quantity;

      if (targetQty > product.stock) {
        this.notificationService.showWarning(
          `Capping quantity at available stock: ${product.stock} units.`,
          'Inventory Limit'
        );
        targetQty = product.stock;
      }

      const updatedItems = [...currentItems];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: targetQty };
      this.updateCartState(updatedItems);
    }
  }

  /**
   * Clears all cart items.
   */
  clearCart(): void {
    this.updateCartState([]);
    this.removeCoupon();
  }

  /**
   * Mock Coupon Engine Code Validation.
   */
  applyCoupon(code: string): boolean {
    const uppercaseCode = code.toUpperCase().trim();
    let discount = 0;

    switch (uppercaseCode) {
      case 'WELCOME10':
        discount = 10;
        break;
      case 'CAKE20':
        discount = 20;
        break;
      case 'FESTIVE50':
        discount = 50;
        break;
      default:
        this.notificationService.showError('Invalid coupon code entered.', 'Coupon Applied');
        return false;
    }

    this.appliedCouponSubject.next(uppercaseCode);
    this.discountPercentageSubject.next(discount);
    this.storageService.setItem(this.COUPON_STORAGE_KEY, { code: uppercaseCode, discount });
    
    this.notificationService.showSuccess(
      `Coupon ${uppercaseCode} applied! You saved ${discount}%.`,
      'Coupon Applied'
    );

    // Forces recalculation of dependent subjects by emitting current cart items again
    this.cartItemsSubject.next(this.cartItemsSubject.value);
    return true;
  }

  removeCoupon(): void {
    this.appliedCouponSubject.next(null);
    this.discountPercentageSubject.next(0);
    this.storageService.removeItem(this.COUPON_STORAGE_KEY);
    this.cartItemsSubject.next(this.cartItemsSubject.value);
  }

  private updateCartState(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    this.storageService.setItem(this.CART_STORAGE_KEY, items);
  }

  private loadCart(): void {
    const savedItems = this.storageService.getItem<CartItem[]>(this.CART_STORAGE_KEY);
    if (savedItems) {
      this.cartItemsSubject.next(savedItems);
    }

    const savedCoupon = this.storageService.getItem<{ code: string, discount: number }>(this.COUPON_STORAGE_KEY);
    if (savedCoupon) {
      this.appliedCouponSubject.next(savedCoupon.code);
      this.discountPercentageSubject.next(savedCoupon.discount);
    }
  }
}
