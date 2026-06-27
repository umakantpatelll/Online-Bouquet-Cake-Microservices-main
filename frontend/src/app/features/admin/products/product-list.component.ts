import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product.service';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product, Category } from '../../../core/models/product.model';
import { AdminProductDialogComponent } from './product-dialog.component';

/**
 * ProductListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The admin catalog management dashboard exposing paginated MatTable grid lists, 
 * adding items, modifications, and delete confirmations.
 */
@Component({
  selector: 'app-admin-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private adminProductService = inject(AdminProductService);
  private notificationService = inject(NotificationService);
  private spinner = inject(NgxSpinnerService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  // Table parameters
  displayedColumns: string[] = ['select', 'id', 'name', 'category', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Filter bindings
  searchText = '';
  selectedCategory = 'ALL';
  categories: (Category | 'ALL')[] = ['ALL', 'CAKE', 'BOUQUET', 'GIFT', 'COMBO'];

  // Selection states
  selectedIds = new Set<number>();

  ngOnInit(): void {
    this.loadAdminProducts();
  }

  loadAdminProducts(): void {
    this.spinner.show();
    this.selectedIds.clear();

    this.productService.getProducts(true).pipe(
      finalize(() => {
        this.spinner.hide();
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource.data = res.data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.applyFilters();
        } else {
          this.notificationService.showError('Failed to retrieve catalog products.', 'Error');
        }
      },
      error: () => {
        this.notificationService.showError('Connection to catalog service failed.', 'Error');
      }
    });
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    const category = this.selectedCategory;

    // Direct filters override
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const matchesSearch = data.name.toLowerCase().includes(search) || 
                            data.description.toLowerCase().includes(search);
      const matchesCategory = category === 'ALL' || data.category === category;
      return matchesSearch && matchesCategory;
    };

    // Trigger filter cycle
    this.dataSource.filter = 'trigger';
    this.cdr.markForCheck();
  }

  // Row Selection logic
  isAllSelected(): boolean {
    const numSelected = this.selectedIds.size;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows && numRows > 0;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selectedIds.clear();
    } else {
      this.dataSource.filteredData.forEach(row => this.selectedIds.add(row.id));
    }
  }

  toggleRow(id: number): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  // CRUD actions
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AdminProductDialogComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.adminProductService.createProduct(result).pipe(
          finalize(() => this.spinner.hide())
        ).subscribe({
          next: () => {
            this.notificationService.showSuccess('Product added successfully', 'Catalog Created');
            this.loadAdminProducts();
          }
        });
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(AdminProductDialogComponent, {
      width: '480px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.adminProductService.updateProduct(product.id, result).pipe(
          finalize(() => this.spinner.hide())
        ).subscribe({
          next: () => {
            this.notificationService.showSuccess('Product updated successfully', 'Catalog Modified');
            this.loadAdminProducts();
          }
        });
      }
    });
  }

  deleteSingleProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete ${product.name} from store catalog?`)) {
      this.spinner.show();
      this.adminProductService.deleteProduct(product.id).pipe(
        finalize(() => this.spinner.hide())
      ).subscribe({
        next: () => {
          this.notificationService.showInfo('Product removed successfully', 'Catalog Deleted');
          this.loadAdminProducts();
        }
      });
    }
  }

  bulkDelete(): void {
    if (this.selectedIds.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${this.selectedIds.size} selected items?`)) {
      this.spinner.show();
      
      // Simulate bulk deleting sequentially in series observables
      let completedCount = 0;
      this.selectedIds.forEach(id => {
        this.adminProductService.deleteProduct(id).subscribe({
          next: () => {
            completedCount++;
            if (completedCount === this.selectedIds.size) {
              this.spinner.hide();
              this.notificationService.showInfo('Bulk delete completed.', 'Catalog Action');
              this.loadAdminProducts();
            }
          },
          error: () => {
            completedCount++;
            if (completedCount === this.selectedIds.size) {
              this.spinner.hide();
              this.loadAdminProducts();
            }
          }
        });
      });
    }
  }
}
