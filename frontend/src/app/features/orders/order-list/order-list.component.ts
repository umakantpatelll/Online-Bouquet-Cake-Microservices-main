import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrderResponse } from '../../../core/models/checkout.model';
import { OrderStatusChipComponent } from '../../../shared/components/order-status/order-status-chip.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

/**
 * OrderListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Displays user order tracking rows, enabling customers to filter, sort, 
 * and track order details.
 */
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OrderStatusChipComponent,
    EmptyStateComponent,
    NgxSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private spinner = inject(NgxSpinnerService);
  private cdr = inject(ChangeDetectorRef);

  orders: OrderResponse[] = [];
  filteredOrders: OrderResponse[] = [];
  errorMessage: string | null = null;

  // Filter & Search bindings
  searchText = '';
  selectedStatus = 'ALL';
  selectedSort = 'NEWEST';

  // Status categories list
  statusOptions = ['ALL', 'PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    const user = this.authService.currentUserSignal();
    const userId = user?.id || 1;

    this.spinner.show();
    this.errorMessage = null;

    this.orderService.getOrdersByUser(userId).pipe(
      finalize(() => {
        this.spinner.hide();
        this.applyFilters();
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.data;
        } else {
          this.errorMessage = 'Failed to load order history.';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to communicate with gateway.';
      }
    });
  }

  applyFilters(): void {
    let result = [...this.orders];

    // 1. Text Search (ID or Product Name)
    const search = this.searchText.toLowerCase().trim();
    if (search) {
      result = result.filter(o => {
        const matchesId = o.id.toString().includes(search);
        const matchesProduct = o.items.some(item => 
          item.productName.toLowerCase().includes(search)
        );
        return matchesId || matchesProduct;
      });
    }

    // 2. Status filter
    if (this.selectedStatus !== 'ALL') {
      result = result.filter(o => o.status === this.selectedStatus);
    }

    // 3. Sorting
    switch (this.selectedSort) {
      case 'NEWEST':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'OLDEST':
        result.sort((a, b) => a.id - b.id);
        break;
      case 'PRICE_DESC':
        result.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case 'PRICE_ASC':
        result.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
    }

    this.filteredOrders = result;
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  trackByOrderId(index: number, order: OrderResponse): number {
    return order.id;
  }
}
