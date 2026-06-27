import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { shareReplay, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product, Category } from '../models/product.model';
import { ApiResponse } from '../models/api-response.model';

/**
 * ProductService
 * ----------------------------------------------------
 * Why this file exists:
 * Connects directly to the backend Product microservice via the API Gateway.
 * Manages caching using the shareReplay(1) operator to optimize network bandwidth.
 * 
 * RxJS Operators:
 * 1. shareReplay(1): Caches the latest value emitted by the observable, sharing it 
 *    among all concurrent subscribers. Reduces redundant server hits.
 * 2. catchError: Prevents broken observables by logging errors and passing along clean fail boundaries.
 * 
 * Interview Tip:
 * Caching with `shareReplay` is a form of memoization. Setting the parameter to `1` instructs 
 * the operator to replay only the most recent value to any new subscriber. This is ideal for 
 * read-only listings.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiGatewayUrl}/api/products`;

  // Cache placeholder for product listing
  private productsCache$?: Observable<ApiResponse<Product[]>>;

  /**
   * Retrieves all catalog items (Cakes and Bouquets).
   * Caches results using shareReplay unless forceRefresh is true.
   */
  getProducts(forceRefresh: boolean = false): Observable<ApiResponse<Product[]>> {
    if (forceRefresh || !this.productsCache$) {
      this.productsCache$ = this.http.get<ApiResponse<Product[]>>(this.API_URL).pipe(
        shareReplay(1),
        catchError(err => {
          this.clearCache(); // Wipes cache on request failure
          return throwError(() => err);
        })
      );
    }
    return this.productsCache$;
  }

  /**
   * Fetches full item details for a specific product ID.
   */
  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.API_URL}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Searches catalog using a query keyword.
   */
  searchProducts(keyword: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.API_URL}/search?keyword=${encodeURIComponent(keyword)}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Retrieves products categorized under a specific tag (CAKE, BOUQUET, GIFT, COMBO).
   */
  getProductsByCategory(category: Category): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.API_URL}/category/${category}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Clears the product list cache to force network updates.
   */
  clearCache(): void {
    this.productsCache$ = undefined;
  }
}
