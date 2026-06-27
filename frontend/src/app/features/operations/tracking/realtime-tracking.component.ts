import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';
import { OrderTimelineComponent } from '../../../shared/components/order-timeline/order-timeline.component';
import { OrderStatusChipComponent } from '../../../shared/components/order-status/order-status-chip.component';

interface ActiveTracking {
  orderId: number;
  customerName: string;
  deliveryAddress: string;
  driverName: string;
  status: string;
  etaMins: number;
}

/**
 * RealtimeTrackingComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The live order operations console allowing dispatchers to monitor ETA times, 
 * addresses, and update active order delivery states.
 */
@Component({
  selector: 'app-operations-realtime-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderTimelineComponent, OrderStatusChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './realtime-tracking.component.html',
  styleUrls: ['./realtime-tracking.component.scss']
})
export class RealtimeTrackingComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  statusSteps = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

  // Tracking database records
  trackingRecords = signal<ActiveTracking[]>([
    { orderId: 15, customerName: 'Amit Sharma', deliveryAddress: 'Flat 402, Green Glen Layout, Bangalore', driverName: 'Dave', status: 'PENDING', etaMins: 45 },
    { orderId: 12, customerName: 'Sonia Rao', deliveryAddress: 'Building 12-A, Tech Park View, Pune', driverName: 'John', status: 'OUT_FOR_DELIVERY', etaMins: 15 },
    { orderId: 10, customerName: 'Raj Malhotra', deliveryAddress: 'Street 4, Sector 15, Gurgaon', driverName: 'Alice', status: 'DELIVERED', etaMins: 0 }
  ]);

  selectedOrderId = signal<number>(15);

  activeOrder = computed(() => 
    this.trackingRecords().find(r => r.orderId === this.selectedOrderId()) || this.trackingRecords()[0]
  );

  ngOnInit(): void {}

  selectOrder(id: number): void {
    this.selectedOrderId.set(id);
  }

  /**
   * Advances the selected order's status to the next logical step.
   */
  simulateNextStep(): void {
    const current = this.activeOrder();
    if (!current) return;

    const currentIndex = this.statusSteps.indexOf(current.status);
    if (currentIndex === -1 || currentIndex === this.statusSteps.length - 1) {
      this.notificationService.showInfo('Order delivery is already completed.', 'Tracking simulator');
      return;
    }

    const nextStatus = this.statusSteps[currentIndex + 1];
    let nextEta = current.etaMins;
    
    // Recalculate ETA values off milestone changes
    if (nextStatus === 'PREPARING') nextEta = 30;
    if (nextStatus === 'OUT_FOR_DELIVERY') nextEta = 15;
    if (nextStatus === 'DELIVERED') nextEta = 0;

    // Apply updates
    const updated = this.trackingRecords().map(rec => 
      rec.orderId === current.orderId 
        ? { ...rec, status: nextStatus, etaMins: nextEta }
        : rec
    );
    this.trackingRecords.set(updated);
    
    this.notificationService.showSuccess(
      `Order #${current.orderId} advanced to ${nextStatus.replace('_', ' ')}`,
      'Status Changed'
    );
    
    this.cdr.markForCheck();
  }

  /**
   * Resets active order status back to PENDING.
   */
  resetSimulation(): void {
    const current = this.activeOrder();
    if (!current) return;

    const updated = this.trackingRecords().map(rec => 
      rec.orderId === current.orderId 
        ? { ...rec, status: 'PENDING', etaMins: 45 }
        : rec
    );
    this.trackingRecords.set(updated);
    this.notificationService.showInfo(`Order #${current.orderId} status reset to PENDING.`, 'Simulation Reset');
    this.cdr.markForCheck();
  }
}
