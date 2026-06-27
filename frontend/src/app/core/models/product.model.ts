/**
 * Product Interface
 * ----------------------------------------------------
 * Why this file exists:
 * Models cakes or bouquets metadata fetched from the Product Service.
 */
export interface Product {
  id: number;
  name: string;
  category: 'CAKE' | 'BOUQUET';
  price: number;
  description: string;
  imageUrl?: string;
  stock: number;
}
