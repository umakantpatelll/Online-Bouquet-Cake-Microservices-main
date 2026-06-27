import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * PaymentService
 * ----------------------------------------------------
 * Why this file exists:
 * Manages checking payment status, checking transactions, or verifying mock invoice profiles.
 */
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);

  getPaymentDetails(paymentId: number) {
    // Phase 11: Call Gateway /api/payments/{id}
  }
}
