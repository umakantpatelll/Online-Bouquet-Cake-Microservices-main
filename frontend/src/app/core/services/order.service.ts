import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OrderRequest, OrderResponse } from '../models/checkout.model';
import { ApiResponse } from '../models/api-response.model';

/**
 * OrderService
 * ----------------------------------------------------
 * Why this file exists:
 * Handles HTTP requests relating to customer orders, including placing 
 * new orders and loading customer order histories.
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiGatewayUrl}/api/orders`;

  /**
   * Places a new cake/bouquet order.
   */
  placeOrder(orderRequest: OrderRequest): Observable<ApiResponse<OrderResponse>> {
    return this.http.post<ApiResponse<OrderResponse>>(this.API_URL, orderRequest).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Fetches the order history for a specific customer ID.
   */
  getOrdersByUser(userId: number): Observable<ApiResponse<OrderResponse[]>> {
    return this.http.get<ApiResponse<OrderResponse[]>>(`${this.API_URL}/user/${userId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Loads specific order items by ID.
   */
  getOrderById(orderId: number): Observable<ApiResponse<OrderResponse>> {
    return this.http.get<ApiResponse<OrderResponse>>(`${this.API_URL}/${orderId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
