/**
 * Checkout and Order DTO structures mapping to backend microservice endpoints.
 */

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  specialInstructions?: string;
}

export interface OrderRequestItem {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  userId: number;
  items: OrderRequestItem[];
}

export interface OrderResponseItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  customerId: number;
  items: OrderResponseItem[];
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  deliveryAddress: string;
  contactNumber: string;
}
