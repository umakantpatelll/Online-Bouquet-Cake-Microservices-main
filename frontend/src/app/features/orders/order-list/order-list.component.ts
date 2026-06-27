import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * OrderListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Lists the customer's previous and current order history.
 */
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <h1 class="fw-bold font-outfit text-main mb-4">Your Orders</h1>
      
      <div class="d-flex flex-column gap-4">
        @for (order of orders(); track order.id) {
          <div class="card card-theme shadow-sm p-4">
            <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom pb-3 mb-3 gap-3">
              <div>
                <span class="text-muted-custom">Order Date:</span>
                <span class="fw-semibold ms-2">{{ order.date }}</span>
              </div>
              <div>
                <span class="text-muted-custom">Order Status:</span>
                <span class="badge ms-2 px-3 py-2 text-uppercase fw-semibold" [ngClass]="{
                  'bg-warning-subtle text-warning': order.status === 'PENDING',
                  'bg-success-subtle text-success': order.status === 'CONFIRMED' || order.status === 'DELIVERED',
                  'bg-info-subtle text-info': order.status === 'OUT_FOR_DELIVERY'
                }">
                  {{ order.status }}
                </span>
              </div>
            </div>
            
            <div class="d-flex flex-column gap-2 mb-3">
              @for (item of order.items; track item.id) {
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center gap-2">
                    <span class="material-icons text-primary-color fs-5">{{ item.category === 'CAKE' ? 'cake' : 'local_florist' }}</span>
                    <span>{{ item.name }} (x{{ item.quantity }})</span>
                  </div>
                  <span class="fw-semibold">₹{{ (item.price * item.quantity) | number:'1.2-2' }}</span>
                </div>
              }
            </div>
            
            <div class="border-top pt-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <span class="text-muted-custom">Order ID:</span>
                <span class="fw-bold ms-2">#{{ order.id }}</span>
              </div>
              <div>
                <span class="text-muted-custom">Total Paid:</span>
                <span class="fw-bold fs-5 text-primary-color ms-2">₹{{ order.total | number:'1.2-2' }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class OrderListComponent {
  orders = signal([
    {
      id: 15,
      date: '2026-06-26T16:38:54',
      status: 'PENDING',
      total: 1350.00,
      items: [
        { id: 1, name: 'Chocolate Truffle Cake', category: 'CAKE', price: 450.00, quantity: 3 }
      ]
    },
    {
      id: 12,
      date: '2026-06-25T11:48:32',
      status: 'DELIVERED',
      total: 1100.00,
      items: [
        { id: 2, name: 'Elegance Red Roses Bouquet', category: 'BOUQUET', price: 550.00, quantity: 2 }
      ]
    }
  ]);
}
