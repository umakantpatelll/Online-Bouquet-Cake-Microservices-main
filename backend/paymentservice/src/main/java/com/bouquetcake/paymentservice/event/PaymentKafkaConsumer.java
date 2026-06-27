package com.bouquetcake.paymentservice.event;

import com.bouquetcake.paymentservice.entity.Payment;
import com.bouquetcake.paymentservice.entity.PaymentStatus;
import com.bouquetcake.paymentservice.entity.ProcessedEvent;
import com.bouquetcake.paymentservice.repository.PaymentRepository;
import com.bouquetcake.paymentservice.repository.ProcessedEventRepository;
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
public class PaymentKafkaConsumer {

    private final PaymentRepository paymentRepository;
    private final ProcessedEventRepository processedEventRepository;
    private final PaymentKafkaProducer paymentKafkaProducer;

    @Transactional
    @KafkaListener(topics = "order-created", groupId = "payment-group")
    public void consumeOrderCreatedEvent(OrderCreatedEvent event) {
        String correlationId = event.getCorrelationId();
        if (correlationId != null) {
            MDC.put("correlationId", correlationId);
        }

        log.info("Received OrderCreatedEvent. Event ID: {}, Order ID: {}, Amount: {}", 
                event.getEventId(), event.getOrderId(), event.getTotalAmount());

        try {
            // 1. Idempotency Check
            if (processedEventRepository.existsById(event.getEventId())) {
                log.warn("Duplicate event detected. Event ID: {} has already been processed. Skipping.", event.getEventId());
                return;
            }

            // 2. Process Payment (simulated check on amount limit)
            PaymentStatus paymentStatus = PaymentStatus.SUCCESS;
            if (event.getTotalAmount() > 5000.0) {
                paymentStatus = PaymentStatus.FAILED;
                log.error("Payment validation failed: Transaction limit exceeded for Order ID: {}", event.getOrderId());
            }

            Payment payment = Payment.builder()
                    .orderId(event.getOrderId())
                    .amount(event.getTotalAmount())
                    .status(paymentStatus)
                    .build();

            Payment savedPayment = paymentRepository.save(payment);

            // 3. Save Processed Event (Idempotent mark)
            ProcessedEvent processedEvent = ProcessedEvent.builder()
                    .eventId(event.getEventId())
                    .processedAt(LocalDateTime.now())
                    .build();
            processedEventRepository.save(processedEvent);

            // 4. Publish PaymentCompletedEvent
            PaymentCompletedEvent responseEvent = PaymentCompletedEvent.builder()
                    .eventId(UUID.randomUUID().toString())
                    .eventTimestamp(LocalDateTime.now().toString())
                    .eventType("PaymentCompletedEvent")
                    .correlationId(correlationId)
                    .version("v1")
                    .paymentId(savedPayment.getId())
                    .orderId(savedPayment.getOrderId())
                    .amount(savedPayment.getAmount())
                    .status(savedPayment.getStatus().name())
                    .build();

            paymentKafkaProducer.sendPaymentCompletedEvent(responseEvent);

        } finally {
            MDC.clear();
        }
    }
}
