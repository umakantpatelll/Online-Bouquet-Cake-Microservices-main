import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * CartComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Lists the customer's selected items, calculates totals, and provides links to checkout.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <h1 class="fw-bold font-outfit text-main mb-4">Your Shopping Cart</h1>
      
      @if (cartItems().length === 0) {
        <div class="card card-theme p-5 text-center shadow-sm">
          <span class="material-icons display-1 text-muted opacity-50 mb-3">shopping_cart</span>
          <h2 class="h3 fw-bold mb-2">Your Cart is Empty</h2>
          <p class="text-muted-custom mb-4">Looks like you haven't added any products to your cart yet.</p>
          <a routerLink="/products" class="btn custom-btn px-4 py-2">Start Shopping</a>
        </div>
      } @else {
        <div class="row g-4">
          <div class="col-lg-8">
            <div class="card card-theme shadow-sm p-4 d-flex flex-column gap-3">
              @for (item of cartItems(); track item.id) {
                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom pb-3 mb-2 gap-3">
                  <div class="d-flex align-items-center gap-3">
                    <span class="material-icons text-primary-color fs-2">{{ item.category === 'CAKE' ? 'cake' : 'local_florist' }}</span>
                    <div>
                      <h3 class="h6 fw-bold mb-1">{{ item.name }}</h3>
                      <span class="text-muted-custom text-sm">Unit Price: ₹{{ item.price | number:'1.2-2' }}</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-4">
                    <div class="d-flex align-items-center border rounded-pill px-2 py-1">
                      <button class="btn btn-link p-0 px-2 text-decoration-none fw-bold" style="font-size: 1.2rem;">-</button>
                      <span class="px-2 fw-semibold">{{ item.quantity }}</span>
                      <button class="btn btn-link p-0 px-2 text-decoration-none fw-bold" style="font-size: 1.2rem;">+</button>
                    </div>
                    <span class="fw-bold fs-5">₹{{ (item.price * item.quantity) | number:'1.2-2' }}</span>
                    <button class="btn btn-link text-danger p-0"><i class="bi bi-trash-fill fs-5"></i></button>
                  </div>
                </div>
              }
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card card-theme shadow-sm p-4">
              <h2 class="h4 fw-bold mb-4 font-outfit">Order Summary</h2>
              <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
                <span class="text-muted-custom">Subtotal</span>
                <span class="fw-semibold">₹{{ calculateSubtotal() | number:'1.2-2' }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
                <span class="text-muted-custom">Delivery</span>
                <span class="text-success fw-semibold">FREE</span>
              </div>
              <div class="d-flex justify-content-between mb-4">
                <span class="fw-bold fs-5">Total</span>
                <span class="fw-bold fs-5 text-primary-color">₹{{ calculateSubtotal() | number:'1.2-2' }}</span>
              </div>
              <a routerLink="/checkout" class="btn custom-btn w-100 py-3 mb-2">Proceed to Checkout</a>
              <a routerLink="/products" class="btn custom-btn-outline w-100 py-3">Continue Shopping</a>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class CartComponent {
  cartItems = signal([
    { id: 1, name: 'Chocolate Truffle Cake', category: 'CAKE', price: 499.00, quantity: 1 },
    { id: 2, name: 'Elegance Red Roses Bouquet', category: 'BOUQUET', price: 699.00, quantity: 2 }
  ]);

  calculateSubtotal() {
    return this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
