package com.bouquetcake.orderservice.event;

import com.bouquetcake.orderservice.config.KafkaConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderKafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendOrderCreatedEvent(OrderCreatedEvent event) {
        log.info("Publishing OrderCreatedEvent to Kafka. Event ID: {}, Correlation ID: {}, Order ID: {}", 
                event.getEventId(), event.getCorrelationId(), event.getOrderId());
        
        kafkaTemplate.send(KafkaConfig.ORDER_CREATED_TOPIC, event.getOrderId().toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex == null) {
                        log.info("Successfully published OrderCreatedEvent with offset: {}", 
                                result.getRecordMetadata().offset());
                    } else {
                        log.error("Failed to publish OrderCreatedEvent", ex);
                    }
                });
    }
}
