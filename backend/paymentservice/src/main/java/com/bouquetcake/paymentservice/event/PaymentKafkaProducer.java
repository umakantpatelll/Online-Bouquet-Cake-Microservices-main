package com.bouquetcake.paymentservice.event;

import com.bouquetcake.paymentservice.config.KafkaConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentKafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendPaymentCompletedEvent(PaymentCompletedEvent event) {
        log.info("Publishing PaymentCompletedEvent to Kafka. Event ID: {}, Correlation ID: {}, Payment ID: {}, Order ID: {}", 
                event.getEventId(), event.getCorrelationId(), event.getPaymentId(), event.getOrderId());
        
        kafkaTemplate.send(KafkaConfig.PAYMENT_SUCCESS_TOPIC, event.getOrderId().toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex == null) {
                        log.info("Successfully published PaymentCompletedEvent with offset: {}", 
                                result.getRecordMetadata().offset());
                    } else {
                        log.error("Failed to publish PaymentCompletedEvent", ex);
                    }
                });
    }
}
