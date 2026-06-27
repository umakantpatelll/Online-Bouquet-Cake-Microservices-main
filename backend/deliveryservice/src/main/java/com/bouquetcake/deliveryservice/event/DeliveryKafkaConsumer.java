package com.bouquetcake.deliveryservice.event;

import com.bouquetcake.deliveryservice.entity.Delivery;
import com.bouquetcake.deliveryservice.entity.DeliveryStatus;
import com.bouquetcake.deliveryservice.entity.ProcessedEvent;
import com.bouquetcake.deliveryservice.repository.DeliveryRepository;
import com.bouquetcake.deliveryservice.repository.ProcessedEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeliveryKafkaConsumer {

    private final DeliveryRepository deliveryRepository;
    private final ProcessedEventRepository processedEventRepository;
    private final DeliveryKafkaProducer deliveryKafkaProducer;

    @Transactional
    @KafkaListener(topics = "payment-success", groupId = "delivery-group")
    public void consumePaymentCompletedEvent(PaymentCompletedEvent event) {
        String correlationId = event.getCorrelationId();
        if (correlationId != null) {
            MDC.put("correlationId", correlationId);
        }

        log.info("Received PaymentCompletedEvent. Event ID: {}, Order ID: {}, Status: {}", 
                event.getEventId(), event.getOrderId(), event.getStatus());

        try {
            // 1. Idempotency Check
            if (processedEventRepository.existsById(event.getEventId())) {
                log.warn("Duplicate event detected. Event ID: {} has already been processed. Skipping.", event.getEventId());
                return;
            }

            // 2. Only process delivery if payment was SUCCESS
            if (!"SUCCESS".equalsIgnoreCase(event.getStatus())) {
                log.warn("Payment failed for Order ID: {}. Delivery creation skipped.", event.getOrderId());
                return;
            }

            Delivery delivery = Delivery.builder()
                    .orderId(event.getOrderId())
                    .deliveryAddress("Default Customer Address (Kafka Event)")
                    .status(DeliveryStatus.PENDING)
                    .build();

            Delivery savedDelivery = deliveryRepository.save(delivery);

            // 3. Save Processed Event (Idempotent mark)
            ProcessedEvent processedEvent = ProcessedEvent.builder()
                    .eventId(event.getEventId())
                    .processedAt(LocalDateTime.now())
                    .build();
            processedEventRepository.save(processedEvent);

            // 4. Publish DeliveryCreatedEvent
            DeliveryCreatedEvent responseEvent = DeliveryCreatedEvent.builder()
                    .eventId(UUID.randomUUID().toString())
                    .eventTimestamp(LocalDateTime.now().toString())
                    .eventType("DeliveryCreatedEvent")
                    .correlationId(correlationId)
                    .version("v1")
                    .deliveryId(savedDelivery.getId())
                    .orderId(savedDelivery.getOrderId())
                    .deliveryAddress(savedDelivery.getDeliveryAddress())
                    .status(savedDelivery.getStatus().name())
                    .build();

            deliveryKafkaProducer.sendDeliveryCreatedEvent(responseEvent);

        } finally {
            MDC.clear();
        }
    }
}
