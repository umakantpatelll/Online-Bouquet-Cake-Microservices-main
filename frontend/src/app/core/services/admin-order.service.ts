import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OrderResponse } from '../models/checkout.model';
import { ApiResponse } from '../models/api-response.model';

/**
 * AdminOrderService
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes methods to search all database orders and update shipment milestones.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiGatewayUrl}/api/orders`;

  /**
   * Fetches every order recorded in the system.
   */
  getAllOrders(): Observable<ApiResponse<OrderResponse[]>> {
    return this.http.get<ApiResponse<OrderResponse[]>>(this.API_URL).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Updates an active order status (e.g. PREPARING, OUT_FOR_DELIVERY, DELIVERED).
   */
  updateOrderStatus(orderId: number, status: string): Observable<ApiResponse<OrderResponse>> {
    return this.http.put<ApiResponse<OrderResponse>>(`${this.API_URL}/${orderId}/status`, { status }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Simulates assigning a courier to a specific shipment.
   */
  assignDeliveryStaff(orderId: number, staffId: number): Observable<ApiResponse<string>> {
    // Delivery assignments are simulated since the microservices architecture acts asynchronously
    return this.http.put<ApiResponse<string>>(`${this.API_URL}/${orderId}/status`, { status: 'CONFIRMED' }).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
