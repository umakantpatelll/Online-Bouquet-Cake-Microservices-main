/**
 * Delivery Interface
 * ----------------------------------------------------
 * Why this file exists:
 * Models tracking info and dispatch statuses from the Delivery Service.
 */
export interface Delivery {
  id: number;
  orderId: number;
  deliveryPartnerName?: string;
  trackingNumber?: string;
  status: 'ASSIGNED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'DELAYED' | 'CANCELLED';
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
}
