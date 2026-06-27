import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../../core/services/notification.service';

interface DeliveryDetail {
  id: number;
  orderId: number;
  deliveryAddress: string;
  courierStaff: string;
  status: string;
  updatedAt: string;
}

/**
 * AdminDeliveryListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes a table grid of deliveries, addresses, and staff assignments.
 */
@Component({
  selector: 'app-admin-delivery-list',
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
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['id', 'orderId', 'deliveryAddress', 'courierStaff', 'status', 'actions'];
  dataSource = new MatTableDataSource<DeliveryDetail>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchText = '';
  selectedStatus = 'ALL';

  private mockDeliveries: DeliveryDetail[] = [
    { id: 201, orderId: 15, deliveryAddress: 'Flat 402, Green Glen Layout, Bangalore', courierStaff: 'Unassigned', status: 'PENDING', updatedAt: '2026-06-26T16:38:54' },
    { id: 202, orderId: 12, deliveryAddress: 'Building 12-A, Tech Park View, Pune', courierStaff: 'John', status: 'OUT_FOR_DELIVERY', updatedAt: '2026-06-25T11:48:32' },
    { id: 203, orderId: 10, deliveryAddress: 'Street 4, Sector 15, Gurgaon', courierStaff: 'Alice', status: 'DELIVERED', updatedAt: '2026-06-24T09:12:10' }
  ];

  ngOnInit(): void {
    this.dataSource.data = [...this.mockDeliveries];
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    const status = this.selectedStatus;

    this.dataSource.filterPredicate = (data: DeliveryDetail, filter: string) => {
      const matchesSearch = data.deliveryAddress.toLowerCase().includes(search) || 
                            data.courierStaff.toLowerCase().includes(search) ||
                            data.orderId.toString().includes(search);
      const matchesStatus = status === 'ALL' || data.status === status;
      return matchesSearch && matchesStatus;
    };

    this.dataSource.filter = 'trigger';
    this.cdr.markForCheck();
  }

  assignCourier(delivery: DeliveryDetail): void {
    const courier = prompt('Enter courier staff name (e.g. John, Alice, Dave):', 'Dave');
    if (courier) {
      this.mockDeliveries = this.mockDeliveries.map(d => 
        d.id === delivery.id ? { ...d, courierStaff: courier, status: 'PREPARING' } : d
      );
      this.dataSource.data = [...this.mockDeliveries];
      this.notificationService.showSuccess(`Assigned courier ${courier} to delivery ID #${delivery.id}`, 'Staff Assigned');
      this.applyFilters();
    }
  }

  markDelivered(delivery: DeliveryDetail): void {
    if (confirm(`Mark delivery #${delivery.id} as completed and handed over?`)) {
      this.mockDeliveries = this.mockDeliveries.map(d => 
        d.id === delivery.id ? { ...d, status: 'DELIVERED', updatedAt: new Date().toISOString() } : d
      );
      this.dataSource.data = [...this.mockDeliveries];
      this.notificationService.showSuccess('Shipment completed successfully', 'Delivery Service');
      this.applyFilters();
    }
  }
}
