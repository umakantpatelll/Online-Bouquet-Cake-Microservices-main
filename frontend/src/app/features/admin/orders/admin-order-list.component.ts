import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AdminOrderService } from '../../../core/services/admin-order.service';
import { NotificationService } from '../../../core/services/notification.service';
import { OrderResponse } from '../../../core/models/checkout.model';
import { AdminOrderStatusDialogComponent } from './order-status-dialog.component';
import { OrderStatusChipComponent } from '../../../shared/components/order-status/order-status-chip.component';

/**
 * AdminOrderListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes a table grid of all customer orders, allowing admins to search, 
 * view lists of purchased items, and change delivery status states.
 */
@Component({
  selector: 'app-admin-order-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    OrderStatusChipComponent,
    NgxSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent implements OnInit {
  private adminOrderService = inject(AdminOrderService);
  private notificationService = inject(NotificationService);
  private spinner = inject(NgxSpinnerService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['id', 'customerId', 'createdAt', 'items', 'totalPrice', 'status', 'actions'];
  dataSource = new MatTableDataSource<OrderResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchText = '';
  selectedStatus = 'ALL';
  statusOptions = ['ALL', 'PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

  ngOnInit(): void {
    this.loadAdminOrders();
  }

  loadAdminOrders(): void {
    this.spinner.show();
    this.adminOrderService.getAllOrders().pipe(
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
          this.notificationService.showError('Failed to retrieve customer orders.', 'Error');
        }
      },
      error: () => {
        this.notificationService.showError('Connection to order service failed.', 'Error');
      }
    });
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    const status = this.selectedStatus;

    this.dataSource.filterPredicate = (data: OrderResponse, filter: string) => {
      const matchesSearch = data.id.toString().includes(search) || 
                            data.customerId.toString().includes(search) ||
                            data.items.some(item => item.productName.toLowerCase().includes(search));
      const matchesStatus = status === 'ALL' || data.status === status;
      return matchesSearch && matchesStatus;
    };

    this.dataSource.filter = 'trigger';
    this.cdr.markForCheck();
  }

  openUpdateStatusDialog(order: OrderResponse): void {
    const dialogRef = this.dialog.open(AdminOrderStatusDialogComponent, {
      width: '450px',
      data: { order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.adminOrderService.updateOrderStatus(order.id, result.status).pipe(
          finalize(() => this.spinner.hide())
        ).subscribe({
          next: () => {
            this.notificationService.showSuccess('Order details updated successfully', 'Order Status');
            this.loadAdminOrders();
          }
        });
      }
    });
  }
}
