import { Product } from './product.model';

/**
 * CartItem Interface
 * ----------------------------------------------------
 * Why this file exists:
 * Models a single item inside the shopping cart, binding a Product reference 
 * with the selected purchase quantity.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}
