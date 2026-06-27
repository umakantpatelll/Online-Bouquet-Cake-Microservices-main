import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { OrderResponse } from '../../core/models/checkout.model';
import { OrderStatusChipComponent } from '../../shared/components/order-status/order-status-chip.component';

/**
 * DashboardComponent (Container View Component)
 * ----------------------------------------------------
 * Why this file exists:
 * The landing customer panel showcasing summaries of spending, 
 * order counts, recent logs, and redirection cards.
 * 
 * Features:
 * Uses Angular 17 Signals (`signal`, `computed`) to recalculate 
 * order metrics instantly upon list modifications.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderStatusChipComponent, NgxSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private spinner = inject(NgxSpinnerService);
  private cdr = inject(ChangeDetectorRef);

  currentUser$ = this.authService.currentUser$;
  
  // Reactively track orders array
  orders = signal<OrderResponse[]>([]);
  errorMessage = signal<string | null>(null);

  // Computed signals based on orders state
  totalOrders = computed(() => this.orders().length);
  
  pendingOrders = computed(() => 
    this.orders().filter(o => ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status)).length
  );
  
  deliveredOrders = computed(() => 
    this.orders().filter(o => o.status === 'DELIVERED').length
  );
  
  cancelledOrders = computed(() => 
    this.orders().filter(o => o.status === 'CANCELLED').length
  );
  
  totalSpent = computed(() => 
    this.orders()
      .filter(o => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + o.totalPrice, 0)
  );

  recentOrders = computed(() => 
    this.orders().slice(0, 3) // Return 3 most recent entries
  );

  ngOnInit(): void {
    this.fetchDashboardDetails();
  }

  fetchDashboardDetails(): void {
    const user = this.authService.currentUserSignal();
    const userId = user?.id || 1; // Fallback validation

    this.spinner.show();
    this.errorMessage.set(null);

    this.orderService.getOrdersByUser(userId).pipe(
      finalize(() => {
        this.spinner.hide();
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: (res) => {
        if (res.success) {
          // Sort newest orders first
          const sorted = [...res.data].sort((a, b) => b.id - a.id);
          this.orders.set(sorted);
        } else {
          this.errorMessage.set('Failed to fetch dashboard metrics.');
        }
      },
      error: () => {
        this.errorMessage.set('Could not establish connection to the gateway.');
      }
    });
  }
}
