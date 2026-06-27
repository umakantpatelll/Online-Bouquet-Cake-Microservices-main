/**
 * Payment Interface
 * ----------------------------------------------------
 * Why this file exists:
 * Models transaction statements from the Payment Service.
 */
export interface Payment {
  id: number;
  orderId: number;
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING' | 'CASH_ON_DELIVERY';
  transactionId?: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
}
