import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product.service';
import { AdminOrderService } from '../../../core/services/admin-order.service';
import { NotificationService } from '../../../core/services/notification.service';

/**
 * ReportsComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Compiles catalog values (products levels, order totals, revenue margins) 
 * into downloadable comma-separated CSV sheets locally.
 */
@Component({
  selector: 'app-operations-reports',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  private productService = inject(ProductService);
  private adminOrderService = inject(AdminOrderService);
  private notificationService = inject(NotificationService);
  private spinner = inject(NgxSpinnerService);

  ngOnInit(): void {}

  /**
   * Compiles and downloads the Sales Report CSV.
   */
  exportSalesReport(): void {
    this.spinner.show();
    this.adminOrderService.getAllOrders().pipe(
      finalize(() => this.spinner.hide())
    ).subscribe({
      next: (res) => {
        if (res.success) {
          const headers = ['Order ID', 'Customer ID', 'Date Placed', 'Total Paid (INR)', 'Delivery Status'];
          const rows = res.data.map(o => [
            o.id,
            o.customerId,
            new Date(o.createdAt).toLocaleDateString(),
            o.totalPrice.toFixed(2),
            o.status
          ]);

          this.downloadCSV('Sales_Report.csv', headers, rows);
        } else {
          this.notificationService.showError('Failed to fetch sales log data.', 'Report Action');
        }
      },
      error: () => this.notificationService.showError('Connection to order service failed.', 'Report Action')
    });
  }

  /**
   * Compiles and downloads the Inventory Catalog CSV.
   */
  exportInventoryReport(): void {
    this.spinner.show();
    this.productService.getProducts(true).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe({
      next: (res) => {
        if (res.success) {
          const headers = ['Product ID', 'Product Title', 'Category', 'Unit Price (INR)', 'Stock Available'];
          const rows = res.data.map(p => [
            p.id,
            `"${p.name.replace(/"/g, '""')}"`,
            p.category,
            p.price.toFixed(2),
            p.stock
          ]);

          this.downloadCSV('Inventory_Report.csv', headers, rows);
        } else {
          this.notificationService.showError('Failed to fetch inventory log data.', 'Report Action');
        }
      },
      error: () => this.notificationService.showError('Connection to product service failed.', 'Report Action')
    });
  }

  /**
   * Compiles and downloads the Monthly Revenue Report CSV.
   */
  exportRevenueReport(): void {
    // Generated based on mock accounting thresholds
    const headers = ['Accounting Period', 'Gross Revenue (INR)', 'Taxes Collected (5%)', 'Net Profit Margin'];
    const rows = [
      ['January 2026', '12400.00', '620.00', '11780.00'],
      ['February 2026', '19850.00', '992.50', '18857.50'],
      ['March 2026', '24500.00', '1225.00', '23275.00']
    ];

    this.downloadCSV('Revenue_Report.csv', headers, rows);
  }

  private downloadCSV(filename: string, headers: string[], rows: any[][]): void {
    try {
      const csvContent = [
        headers.join(','),
        ...rows.map(e => e.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.notificationService.showSuccess(`${filename} downloaded successfully.`, 'CSV Generated');
    } catch (e) {
      this.notificationService.showError('Failed to compile CSV data sheet.', 'Print Action');
    }
  }
}
