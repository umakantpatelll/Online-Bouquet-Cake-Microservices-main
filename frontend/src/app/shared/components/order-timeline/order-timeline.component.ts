import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineStep {
  status: string;
  label: string;
  desc: string;
  icon: string;
}

/**
 * OrderTimelineComponent (Shared Presentational Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Renders a highly visual step-by-step order tracking status timeline.
 */
@Component({
  selector: 'app-order-timeline',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-timeline.component.html',
  styleUrls: ['./order-timeline.component.scss']
})
export class OrderTimelineComponent implements OnInit, OnChanges {
  @Input({ required: true }) activeStatus: string = 'PENDING';

  activeStepIndex: number = 0;
  isCancelled: boolean = false;

  standardSteps: TimelineStep[] = [
    { status: 'PENDING', label: 'Order Placed', desc: 'Received & awaiting approval', icon: 'shopping_bag' },
    { status: 'CONFIRMED', label: 'Confirmed', desc: 'Sellers accepted the order', icon: 'check_circle' },
    { status: 'PREPARING', label: 'Preparing', desc: 'Baking cake / sorting flowers', icon: 'restaurant' },
    { status: 'OUT_FOR_DELIVERY', label: 'Out For Delivery', desc: 'Courier en route to location', icon: 'local_shipping' },
    { status: 'DELIVERED', label: 'Delivered', desc: 'Handed over successfully', icon: 'home' }
  ];

  cancelledSteps: TimelineStep[] = [
    { status: 'PENDING', label: 'Order Placed', desc: 'Received', icon: 'shopping_bag' },
    { status: 'CANCELLED', label: 'Cancelled', desc: 'This order was cancelled', icon: 'cancel' }
  ];

  get steps(): TimelineStep[] {
    return this.isCancelled ? this.cancelledSteps : this.standardSteps;
  }

  ngOnInit(): void {
    this.resolveActiveStep();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeStatus']) {
      this.resolveActiveStep();
    }
  }

  private resolveActiveStep(): void {
    const status = this.activeStatus.toUpperCase();
    this.isCancelled = status === 'CANCELLED';

    if (this.isCancelled) {
      this.activeStepIndex = 1;
      return;
    }

    const index = this.standardSteps.findIndex(s => s.status === status);
    this.activeStepIndex = index > -1 ? index : 0;
  }
}
