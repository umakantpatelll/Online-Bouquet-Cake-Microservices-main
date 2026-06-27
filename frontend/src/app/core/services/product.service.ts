import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * ProductService
 * ----------------------------------------------------
 * Why this file exists:
 * Handles fetching cake & bouquet catalog listings, categories, and item detail profiles.
 * 
 * Future Responsibilities (Phase 11):
 * - Call the Product Service backend endpoints (`/api/products/*`) via the API Gateway.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    // Phase 11: Call Gateway /api/products
  }

  getProductById(id: number) {
    // Phase 11: Call Gateway /api/products/{id}
  }

  createProduct(product: any) {
    // Phase 11: Call Gateway POST /api/products (Admin only)
  }
}
