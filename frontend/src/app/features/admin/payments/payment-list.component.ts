import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../../core/services/notification.service';

interface PaymentDetail {
  transactionId: string;
  orderId: number;
  paymentMethod: string;
  amount: number;
  status: string;
  createdAt: string;
}

/**
 * AdminPaymentListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes a table grid of store payment transactions and cash settlement summaries.
 */
@Component({
  selector: 'app-admin-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class AdminPaymentListComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['transactionId', 'orderId', 'createdAt', 'paymentMethod', 'amount', 'status', 'actions'];
  dataSource = new MatTableDataSource<PaymentDetail>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchText = '';
  selectedStatus = 'ALL';

  private mockPayments: PaymentDetail[] = [
    { transactionId: 'TXN-908123901', orderId: 15, paymentMethod: 'CREDIT_CARD', amount: 1350.00, status: 'SUCCESSFUL', createdAt: '2026-06-26T16:38:54' },
    { transactionId: 'TXN-908123902', orderId: 12, paymentMethod: 'UPI', amount: 1100.00, status: 'SUCCESSFUL', createdAt: '2026-06-25T11:48:32' },
    { transactionId: 'TXN-908123903', orderId: 10, paymentMethod: 'COD', amount: 450.00, status: 'PENDING', createdAt: '2026-06-24T09:12:10' }
  ];

  ngOnInit(): void {
    this.dataSource.data = [...this.mockPayments];
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    const status = this.selectedStatus;

    this.dataSource.filterPredicate = (data: PaymentDetail, filter: string) => {
      const matchesSearch = data.transactionId.toLowerCase().includes(search) || 
                            data.orderId.toString().includes(search);
      const matchesStatus = status === 'ALL' || data.status === status;
      return matchesSearch && matchesStatus;
    };

    this.dataSource.filter = 'trigger';
    this.cdr.markForCheck();
  }

  triggerRefund(payment: PaymentDetail): void {
    if (confirm(`Are you sure you want to trigger a refund for transaction ${payment.transactionId}?`)) {
      // Simulate state update
      this.mockPayments = this.mockPayments.map(p => 
        p.transactionId === payment.transactionId ? { ...p, status: 'REFUNDED' } : p
      );
      this.dataSource.data = [...this.mockPayments];
      this.notificationService.showInfo('Refund transaction initiated successfully.', 'Payment Action');
      this.applyFilters();
    }
  }
}
