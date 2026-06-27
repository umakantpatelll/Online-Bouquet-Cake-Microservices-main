/**
 * Notification Interface
 * ----------------------------------------------------
 * Why this file exists:
 * Models user notifications for delivery or status alerts.
 */
export interface Notification {
  id: number;
  recipientId: number;
  message: string;
  type: 'ORDER_STATUS' | 'PAYMENT' | 'PROMO';
  read: boolean;
  createdAt: string;
}
