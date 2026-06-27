/**
 * Order Interface & Status Enum
 * ----------------------------------------------------
 * Why this file exists:
 * Models transaction records mapping directly to the Order Service database entities.
 */
export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerId: number;
  items: OrderItem[];
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  deliveryAddress: string;
  contactNumber: string;
}
