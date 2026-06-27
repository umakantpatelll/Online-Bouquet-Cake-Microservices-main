import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OperationsService, LiveNotification } from '../../../core/services/operations.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RelativeTimePipe } from '../../../core/pipes/relative-time.pipe';

/**
 * OperationsDashboardComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Accumulates real-time system metrics, notification category pools, 
 * and handles operations centers alert notifications.
 */
@Component({
  selector: 'app-operations-dashboard',
  standalone: true,
  imports: [CommonModule, RelativeTimePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './operations-dashboard.component.html',
  styleUrls: ['./operations-dashboard.component.scss']
})
export class OperationsDashboardComponent implements OnInit, OnDestroy {
  private operationsService = inject(OperationsService);
  private uiNotificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  private notifSub?: Subscription;

  // Reactively track notifications stack
  notifications = signal<LiveNotification[]>([]);

  // Computed unread alerts count
  unreadCount = computed(() => this.notifications().filter(n => !n.isRead).length);

  // Mock initial dashboard parameters
  todayRevenue = 14850.00;
  activeOrdersCount = 8;
  pendingDeliveriesCount = 3;
  failedPaymentsCount = 1;

  ngOnInit(): void {
    // Generate initial notifications mock stack
    const initial: LiveNotification[] = [
      { id: 91, category: 'ORDERS', message: 'Order #31 confirmation pending', timestamp: new Date(Date.now() - 600000).toISOString(), isRead: false },
      { id: 92, category: 'PAYMENTS', message: 'Bank settlement successful for ID #30', timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: true }
    ];
    this.notifications.set(initial);

    // Subscribe to real-time notification events
    this.notifSub = this.operationsService.liveNotifications$.subscribe(notif => {
      // Prepend incoming notifications to stack, capping at 10 items
      const updated = [notif, ...this.notifications()].slice(0, 10);
      this.notifications.set(updated);
      
      this.uiNotificationService.showInfo(notif.message, `Event: ${notif.category}`);
      this.cdr.markForCheck();
    });
  }

  markAsRead(id: number): void {
    const updated = this.notifications().map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    this.notifications.set(updated);
    this.cdr.markForCheck();
  }

  deleteNotification(id: number): void {
    const updated = this.notifications().filter(n => n.id !== id);
    this.notifications.set(updated);
    this.cdr.markForCheck();
  }

  clearAll(): void {
    this.notifications.set([]);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.notifSub) {
      this.notifSub.unsubscribe();
    }
  }
}
