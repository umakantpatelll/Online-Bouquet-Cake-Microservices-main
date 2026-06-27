import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { OrderService } from '../../../core/services/order.service';
import { OrderResponse } from '../../../core/models/checkout.model';
import { OrderStatusChipComponent } from '../../../shared/components/order-status/order-status-chip.component';
import { OrderTimelineComponent } from '../../../shared/components/order-timeline/order-timeline.component';
import { InvoiceComponent } from '../../../shared/components/invoice/invoice.component';

/**
 * OrderDetailsComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Fetches and displays tracking parameters, delivery timelines, 
 * invoice downloads, and billing details for a specific order.
 */
@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    OrderStatusChipComponent,
    OrderTimelineComponent,
    InvoiceComponent,
    NgxSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private spinner = inject(NgxSpinnerService);
  private cdr = inject(ChangeDetectorRef);

  order: OrderResponse | null = null;
  errorMessage: string | null = null;

  private paramSub?: Subscription;

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.fetchOrderDetails(+idParam);
      }
    });
  }

  fetchOrderDetails(id: number): void {
    this.spinner.show();
    this.errorMessage = null;
    this.order = null;

    this.orderService.getOrderById(id).pipe(
      catchError(err => {
        this.errorMessage = 'Failed to fetch details for this order. It may not exist or belongs to another account.';
        return of({ success: false, data: null as unknown as OrderResponse });
      }),
      finalize(() => {
        this.spinner.hide();
        this.cdr.markForCheck();
      })
    ).subscribe(res => {
      if (res.success && res.data) {
        this.order = res.data;
      }
    });
  }

  retryLoad(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.fetchOrderDetails(+idParam);
    }
  }

  ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
}
