/**
 * Product Models and Interfaces
 * ----------------------------------------------------
 * Why this file exists:
 * Declares domain models and DTO structures mapping to the backend Product microservice.
 */

export type Category = 'CAKE' | 'BOUQUET' | 'GIFT' | 'COMBO';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  description: string;
  imageUrl?: string;
  stock: number;
  createdAt?: string;
}

export interface ProductResponse extends Product {}

export interface ProductSummaryResponse {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  imageUrl?: string;
}

export interface ProductFilter {
  category?: Category | 'ALL';
  minPrice?: number;
  maxPrice?: number;
  searchKeyword?: string;
}
