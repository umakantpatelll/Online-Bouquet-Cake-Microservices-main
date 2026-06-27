import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription, combineLatest, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product.service';
import { Product, Category } from '../../../core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

/**
 * ProductListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The primary catalog layout screen displaying all cakes, flowers, and combos.
 * 
 * Performance Optimization:
 * 1. ChangeDetectionStrategy.OnPush: Minimizes digest loop checks. Manually triggers updates 
 *    when server results load.
 * 2. trackBy (trackByProductId): Prevents complete DOM rebuilding when catalog listings update.
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    ProductSearchComponent,
    EmptyStateComponent,
    NgxSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private spinner = inject(NgxSpinnerService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  // Component UI State variables
  products: Product[] = [];
  filteredProducts: Product[] = [];
  errorMessage: string | null = null;
  
  // Filtering state
  selectedCategory = signal<Category | 'ALL'>('ALL');
  searchKeyword = signal<string>('');

  private querySub?: Subscription;

  // Category tags to render as bootstrap chips
  categories: (Category | 'ALL')[] = ['ALL', 'CAKE', 'BOUQUET', 'GIFT', 'COMBO'];

  ngOnInit(): void {
    // Read route query parameters if navigated via homepage categories links
    this.route.queryParams.subscribe(params => {
      const catParam = params['category'];
      if (catParam && this.categories.includes(catParam as Category)) {
        this.selectedCategory.set(catParam as Category);
      }
    });

    this.loadCatalog();
  }

  /**
   * Fetches data from the ProductService cache/endpoints.
   */
  loadCatalog(forceRefresh: boolean = false): void {
    this.spinner.show();
    this.errorMessage = null;

    this.productService.getProducts(forceRefresh).pipe(
      catchError(err => {
        this.errorMessage = 'Failed to load catalog products. Please check your internet connection.';
        return of({ success: false, data: [] as Product[] });
      }),
      finalize(() => {
        this.spinner.hide();
        this.applyFilters();
        this.cdr.markForCheck(); // Push updates to the UI manually under OnPush mode
      })
    ).subscribe(res => {
      if (res.success) {
        this.products = res.data;
      }
    });
  }

  /**
   * Filter and search logic triggered client-side.
   */
  applyFilters(): void {
    const category = this.selectedCategory();
    const keyword = this.searchKeyword().toLowerCase().trim();

    this.filteredProducts = this.products.filter(p => {
      const matchesCategory = category === 'ALL' || p.category === category;
      const matchesKeyword = !keyword || 
        p.name.toLowerCase().includes(keyword) || 
        p.description.toLowerCase().includes(keyword);
      return matchesCategory && matchesKeyword;
    });
  }

  onCategorySelect(category: Category | 'ALL'): void {
    this.selectedCategory.set(category);
    this.applyFilters();
    this.cdr.markForCheck();
  }

  onSearch(keyword: string): void {
    this.searchKeyword.set(keyword);
    this.applyFilters();
    this.cdr.markForCheck();
  }

  /**
   * trackBy performance optimizer function.
   */
  trackByProductId(index: number, item: Product): number {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
