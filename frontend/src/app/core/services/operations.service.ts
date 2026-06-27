import { Injectable } from '@angular/core';
import { Observable, interval, Subject, merge } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

export interface KafkaEvent {
  id: string;
  eventType: 'OrderCreated' | 'PaymentCompleted' | 'DeliveryCreated' | 'NotificationSent';
  correlationId: string;
  timestamp: string;
  status: string;
  payload: string;
}

export interface LiveNotification {
  id: number;
  category: 'ORDERS' | 'PAYMENTS' | 'DELIVERY' | 'OFFERS' | 'ADMIN';
  message: string;
  timestamp: string;
  isRead: boolean;
}

/**
 * OperationsService (Real-Time Streams Service)
 * ----------------------------------------------------
 * Why this file exists:
 * Simulates microservices Server Sent Events (SSE) / WebSocket streams 
 * by generating real-time Kafka messaging data and operations center feeds.
 */
@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private manualKafkaEvents$ = new Subject<KafkaEvent>();
  private manualNotifications$ = new Subject<LiveNotification>();

  private eventTypes: KafkaEvent['eventType'][] = [
    'OrderCreated', 
    'PaymentCompleted', 
    'DeliveryCreated', 
    'NotificationSent'
  ];

  // 1. Live stream of simulated Kafka transactions
  kafkaEvents$: Observable<KafkaEvent> = merge(
    interval(4500).pipe(
      map(() => this.generateMockKafkaEvent()),
      share()
    ),
    this.manualKafkaEvents$
  );

  // 2. Live stream of alerts/notifications
  liveNotifications$: Observable<LiveNotification> = merge(
    interval(10000).pipe(
      map(() => this.generateMockNotification()),
      share()
    ),
    this.manualNotifications$
  );

  /**
   * Manually pushes a custom Kafka event down the stream.
   */
  emitKafkaEvent(event: KafkaEvent): void {
    this.manualKafkaEvents$.next(event);
  }

  /**
   * Manually triggers a real-time notification alert.
   */
  emitNotification(notification: LiveNotification): void {
    this.manualNotifications$.next(notification);
  }

  private generateMockKafkaEvent(): KafkaEvent {
    const type = this.eventTypes[Math.floor(Math.random() * this.eventTypes.length)];
    const correlationId = `CID-${Math.floor(100000 + Math.random() * 900000)}`;
    const id = `KFK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    let payload = '';
    switch (type) {
      case 'OrderCreated':
        payload = `{"orderId": ${Math.floor(Math.random() * 100)}, "total": 1250.00}`;
        break;
      case 'PaymentCompleted':
        payload = `{"txnId": "TXN-${Math.floor(100000 + Math.random() * 900000)}", "status": "SUCCESSFUL"}`;
        break;
      case 'DeliveryCreated':
        payload = `{"deliveryId": ${Math.floor(Math.random() * 200)}, "courier": "Dave"}`;
        break;
      case 'NotificationSent':
        payload = `{"channel": "EMAIL", "recipient": "user@gmail.com"}`;
        break;
    }

    return {
      id,
      eventType: type,
      correlationId,
      timestamp: new Date().toISOString(),
      status: 'PROCESSED',
      payload
    };
  }

  private generateMockNotification(): LiveNotification {
    const categories: LiveNotification['category'][] = ['ORDERS', 'PAYMENTS', 'DELIVERY', 'OFFERS', 'ADMIN'];
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const id = Math.floor(Math.random() * 1000);

    let message = '';
    switch (cat) {
      case 'ORDERS':
        message = `New Order #${Math.floor(Math.random() * 100)} was successfully placed!`;
        break;
      case 'PAYMENTS':
        message = `Transaction for Order #${Math.floor(Math.random() * 100)} settled successfully.`;
        break;
      case 'DELIVERY':
        message = `Courier is out for delivery for package #${Math.floor(Math.random() * 200)}.`;
        break;
      case 'OFFERS':
        message = `Apply coupon CAKE20 to save 20% off all catalog items!`;
        break;
      case 'ADMIN':
        message = `System database check completed successfully.`;
        break;
    }

    return {
      id,
      category: cat,
      message,
      timestamp: new Date().toISOString(),
      isRead: false
    };
  }
}
