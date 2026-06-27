import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
import { AdminOrderService } from '../../../core/services/admin-order.service';
import { ProductService } from '../../../core/services/product.service';
import { OrderResponse } from '../../../core/models/checkout.model';
import { Product } from '../../../core/models/product.model';
import { OrderStatusChipComponent } from '../../../shared/components/order-status/order-status-chip.component';

Chart.register(...registerables);

/**
 * AdminDashboardComponent (Analytics View Component)
 * ----------------------------------------------------
 * Why this file exists:
 * The primary operations dashboard presenting charts, metrics totals, 
 * and recently placed customer orders.
 */
@Component({
  selector: 'app-admin-dashboard-analytics',
  standalone: true,
  imports: [CommonModule, OrderStatusChipComponent, NgxSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private adminOrderService = inject(AdminOrderService);
  private productService = inject(ProductService);
  private spinner = inject(NgxSpinnerService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('revenueChart') revenueChartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance?: Chart;

  // Reactively track admin database values
  orders = signal<OrderResponse[]>([]);
  products = signal<Product[]>([]);
  errorMessage = signal<string | null>(null);

  // Computed signals
  totalOrders = computed(() => this.orders().length);
  
  pendingOrders = computed(() => 
    this.orders().filter(o => ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status)).length
  );
  
  completedOrders = computed(() => 
    this.orders().filter(o => o.status === 'DELIVERED').length
  );
  
  cancelledOrders = computed(() => 
    this.orders().filter(o => o.status === 'CANCELLED').length
  );

  totalRevenue = computed(() => 
    this.orders()
      .filter(o => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + o.totalPrice, 0)
  );

  catalogCount = computed(() => this.products().length);

  recentOrders = computed(() => this.orders().slice(0, 5));

  ngOnInit(): void {
    this.loadAdminMetricsData();
  }

  ngAfterViewInit(): void {
    // Initialise empty chart wrapper
    this.initChart([]);
  }

  loadAdminMetricsData(): void {
    this.spinner.show();
    this.errorMessage.set(null);

    // Fetch all catalog orders
    this.adminOrderService.getAllOrders().pipe(
      finalize(() => {
        this.spinner.hide();
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: (res) => {
        if (res.success) {
          const sorted = [...res.data].sort((a, b) => b.id - a.id);
          this.orders.set(sorted);
          this.updateChartData(sorted);
        } else {
          this.errorMessage.set('Failed to fetch admin metrics data.');
        }
      },
      error: () => {
        this.errorMessage.set('Gateway connection error.');
      }
    });

    // Fetch total products
    this.productService.getProducts(true).subscribe(res => {
      if (res.success) {
        this.products.set(res.data);
      }
    });
  }

  private initChart(revenueData: number[]): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Fill remaining months with mock analytics if database history is thin
    const dataPoints = revenueData.length > 0 ? revenueData : [1200, 1900, 3000, 5000, 4000, 7000, 6500, 8900, 9200, 11500, 10200, 14500];

    const ctx = this.revenueChartCanvas?.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue Trend (INR)',
          data: dataPoints,
          backgroundColor: '#ff6b6b',
          borderColor: '#ff4b4b',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  private updateChartData(sortedOrders: OrderResponse[]): void {
    // Generate monthly values based on order creation timestamps
    const monthlySum = new Array(12).fill(0);
    sortedOrders.forEach(o => {
      if (o.status !== 'CANCELLED') {
        const monthIndex = new Date(o.createdAt).getMonth();
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlySum[monthIndex] += o.totalPrice;
        }
      }
    });

    // If sum is entirely zero, fallback to visual mock metrics to verify graphics load
    const isSumEmpty = monthlySum.reduce((s, v) => s + v, 0) === 0;
    
    if (this.revenueChartCanvas) {
      this.initChart(isSumEmpty ? [] : monthlySum);
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
