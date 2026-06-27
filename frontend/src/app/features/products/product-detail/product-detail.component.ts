import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { PriceDiscountPipe } from '../pipes/price-discount.pipe';
import { StockStatusPipe } from '../pipes/stock-status.pipe';
import { CategoryColorPipe } from '../pipes/category-color.pipe';
import { LazyImageDirective } from '../directives/lazy-image.directive';

/**
 * ProductDetailComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Fetches and displays detail profiles for a single catalog cake/bouquet.
 * 
 * Routing features used:
 * - ActivatedRoute: Used to read URL parameters (e.g. products/:id).
 * 
 * Performance Optimization:
 * - ChangeDetectionStrategy.OnPush: UI updates only occur when inputs change 
 *   or change detector marks check on server replies.
 */
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PriceDiscountPipe,
    StockStatusPipe,
    CategoryColorPipe,
    LazyImageDirective,
    NgxSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private spinner = inject(NgxSpinnerService);
  private cdr = inject(ChangeDetectorRef);

  product: Product | null = null;
  errorMessage: string | null = null;
  
  private paramSub?: Subscription;

  ngOnInit(): void {
    // Listen to parameter map stream to support parameter changes
    this.paramSub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.fetchProductDetails(id);
      }
    });
  }

  fetchProductDetails(id: number): void {
    this.spinner.show();
    this.errorMessage = null;
    this.product = null;

    this.productService.getProductById(id).pipe(
      catchError(err => {
        this.errorMessage = 'Failed to load details for this product. It may have been removed or does not exist.';
        return of({ success: false, data: null as unknown as Product });
      }),
      finalize(() => {
        this.spinner.hide();
        this.cdr.markForCheck();
      })
    ).subscribe(res => {
      if (res.success && res.data) {
        this.product = res.data;
      }
    });
  }

  retryFetch(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.fetchProductDetails(+idParam);
    }
  }

  ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
}
