import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * CheckoutComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Page boundary for entering shipping address and triggering mock payment creation.
 */
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <h1 class="fw-bold font-outfit text-main mb-4">Checkout</h1>
      
      <div class="row g-4">
        <div class="col-lg-7">
          <div class="card card-theme shadow-sm p-4">
            <h2 class="h4 fw-bold mb-4 font-outfit">Shipping Details</h2>
            <div class="alert alert-info py-2 mb-4" role="alert">
              <i class="bi bi-info-circle-fill"></i> Database mapping for delivery details will be integrated in Phase 11.
            </div>
            <form>
              <div class="mb-3">
                <label class="form-label fw-semibold">Delivery Address</label>
                <textarea class="form-control" rows="3" placeholder="123 Main St, New York" disabled></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Contact Number</label>
                <input type="text" class="form-control" placeholder="+1 (555) 019-2834" disabled>
              </div>
              <div class="mb-4">
                <label class="form-label fw-semibold">Delivery Instructions (Optional)</label>
                <input type="text" class="form-control" placeholder="Leave at the door, call before delivery, etc." disabled>
              </div>
              <button type="submit" class="btn custom-btn w-100 py-3" disabled>Place Order (Mock Payment)</button>
            </form>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card card-theme shadow-sm p-4">
            <h2 class="h4 fw-bold mb-4 font-outfit">Summary of Items</h2>
            <div class="d-flex flex-column gap-3 mb-4">
              @for (item of items(); track item.id) {
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="h6 fw-bold mb-1">{{ item.name }} (x{{ item.quantity }})</h3>
                    <span class="text-muted-custom text-sm">Category: {{ item.category }}</span>
                  </div>
                  <span class="fw-bold">₹{{ (item.price * item.quantity) | number:'1.2-2' }}</span>
                </div>
              }
            </div>
            <div class="border-top pt-3 d-flex justify-content-between align-items-center">
              <span class="fw-bold fs-5">Total Amount</span>
              <span class="fw-bold fs-5 text-primary-color">₹{{ calculateTotal() | number:'1.2-2' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  items = signal([
    { id: 1, name: 'Chocolate Truffle Cake', category: 'CAKE', price: 499.00, quantity: 1 },
    { id: 2, name: 'Elegance Red Roses Bouquet', category: 'BOUQUET', price: 699.00, quantity: 2 }
  ]);

  calculateTotal() {
    return this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
