package com.bouquetcake.notificationservice.event;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class NotificationKafkaConsumer {

    // Thread-safe in-memory set to ensure idempotency for Notification Service
    private final Set<String> processedEventIds = ConcurrentHashMap.newKeySet();

    @KafkaListener(topics = "delivery-created", groupId = "notification-group")
    public void consumeDeliveryCreatedEvent(DeliveryCreatedEvent event) {
        String correlationId = event.getCorrelationId();
        if (correlationId != null) {
            MDC.put("correlationId", correlationId);
        }

        log.info("Received DeliveryCreatedEvent. Event ID: {}, Delivery ID: {}, Order ID: {}", 
                event.getEventId(), event.getDeliveryId(), event.getOrderId());

        try {
            // 1. Idempotency Check
            if (processedEventIds.contains(event.getEventId())) {
                log.warn("Duplicate event detected in Notification Service. Event ID: {} has already been processed. Skipping.", event.getEventId());
                return;
            }

            // Mark as processed
            processedEventIds.add(event.getEventId());

            // 2. Generate and Log SMS notification
            log.info(">>>> [SMS ALERT SENDING] To customer: Your order #{} has been processed for delivery. Delivery ID: #{} is on its way to {}.", 
                    event.getOrderId(), event.getDeliveryId(), event.getDeliveryAddress());

            // 3. Generate and Log Email notification
            log.info(">>>> [EMAIL ALERT SENDING] Subject: Order Delivery Scheduled! Dear Customer, your cake/bouquet order #{} is out for delivery. Address details: {}.", 
                    event.getOrderId(), event.getDeliveryAddress());

            log.info("Successfully dispatched notifications for Order ID: {} and logged status.", event.getOrderId());

        } finally {
            MDC.clear();
        }
    }
}
