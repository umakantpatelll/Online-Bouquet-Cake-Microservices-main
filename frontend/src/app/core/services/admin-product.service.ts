import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';
import { ApiResponse } from '../models/api-response.model';
import { ProductService } from './product.service';

/**
 * AdminProductService
 * ----------------------------------------------------
 * Why this file exists:
 * Handles catalog modifying transactions (Create, Edit, Delete) 
 * reserved for administrator profiles.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private http = inject(HttpClient);
  private productService = inject(ProductService);

  private readonly API_URL = `${environment.apiGatewayUrl}/api/products`;

  /**
   * Registers a new product in the catalog database.
   * Clears the user product cache upon success.
   */
  createProduct(product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.API_URL, product).pipe(
      tap(() => this.productService.clearCache()),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Updates an existing product details by ID.
   * Clears cache on success.
   */
  updateProduct(id: number, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.API_URL}/${id}`, product).pipe(
      tap(() => this.productService.clearCache()),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Deletes a product from database catalog.
   */
  deleteProduct(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.productService.clearCache()),
      catchError(err => throwError(() => err))
    );
  }
}
