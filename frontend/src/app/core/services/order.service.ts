import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * OrderService
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes methods to place customer orders, track status, and view history.
 * 
 * Future Responsibilities (Phase 11):
 * - Call the Order Service endpoints (`/api/orders/*`) using Feign/REST via API Gateway.
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  placeOrder(orderRequest: any) {
    // Phase 11: POST /api/orders
  }

  getOrdersByUser() {
    // Phase 11: GET /api/orders
  }

  updateOrderStatus(orderId: number, status: string) {
    // Phase 11: PUT /api/orders/{id}/status (Admin only)
  }
}
