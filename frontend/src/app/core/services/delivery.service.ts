import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * DeliveryService
 * ----------------------------------------------------
 * Why this file exists:
 * Manages fetching real-time dispatch details and delivery tracking states.
 */
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private http = inject(HttpClient);

  getDeliveryStatus(deliveryId: number) {
    // Phase 11: Call Gateway /api/deliveries/{id}/status
  }
}
