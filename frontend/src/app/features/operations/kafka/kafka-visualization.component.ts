import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OperationsService, KafkaEvent } from '../../../core/services/operations.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AutoScrollDirective } from '../../../core/directives/auto-scroll.directive';

/**
 * KafkaVisualizationComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The live system telemetry console. Displays real-time message streams, 
 * Correlation IDs, payloads, and events.
 */
@Component({
  selector: 'app-operations-kafka-visualization',
  standalone: true,
  imports: [CommonModule, AutoScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kafka-visualization.component.html',
  styleUrls: ['./kafka-visualization.component.scss']
})
export class KafkaVisualizationComponent implements OnInit, OnDestroy {
  private operationsService = inject(OperationsService);
  private uiNotificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  private kafkaSub?: Subscription;
  isPaused = signal<boolean>(false);

  // Array of logged events
  eventsList = signal<KafkaEvent[]>([]);

  ngOnInit(): void {
    // Generate initial startup messages
    const initial: KafkaEvent[] = [
      { id: 'KFK-908123', eventType: 'OrderCreated', correlationId: 'CID-239081', timestamp: new Date(Date.now() - 30000).toISOString(), status: 'PROCESSED', payload: '{"orderId": 14, "total": 950.00}' }
    ];
    this.eventsList.set(initial);

    // Subscribe to live Kafka stream
    this.subscribeToStream();
  }

  private subscribeToStream(): void {
    this.kafkaSub = this.operationsService.kafkaEvents$.subscribe(evt => {
      if (this.isPaused()) return;
      
      // Append event, keeping a cap of 50 log rows
      const updated = [...this.eventsList(), evt].slice(-50);
      this.eventsList.set(updated);
      this.cdr.markForCheck();
    });
  }

  togglePause(): void {
    this.isPaused.set(!this.isPaused());
    const actionLabel = this.isPaused() ? 'PAUSED' : 'RESUMED';
    this.uiNotificationService.showInfo(`Kafka stream telemetry has been ${actionLabel}.`, 'Kafka Broker');
  }

  clearConsole(): void {
    this.eventsList.set([]);
    this.cdr.markForCheck();
  }

  /**
   * Dispatches a simulated OrderCreated event down the stream immediately.
   */
  injectOrderCreatedEvent(): void {
    const id = `KFK-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const correlationId = `CID-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const manualEvent: KafkaEvent = {
      id,
      eventType: 'OrderCreated',
      correlationId,
      timestamp: new Date().toISOString(),
      status: 'PROCESSED',
      payload: `{"orderId": ${Math.floor(Math.random() * 100)}, "total": 650.00}`
    };

    this.operationsService.emitKafkaEvent(manualEvent);
    this.uiNotificationService.showSuccess('Dispatched OrderCreated event to Kafka broker.', 'Manual Event Injected');
  }

  ngOnDestroy(): void {
    if (this.kafkaSub) {
      this.kafkaSub.unsubscribe();
    }
  }
}
