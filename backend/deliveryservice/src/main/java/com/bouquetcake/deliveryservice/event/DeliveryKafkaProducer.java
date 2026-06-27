package com.bouquetcake.deliveryservice.event;

import com.bouquetcake.deliveryservice.config.KafkaConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeliveryKafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendDeliveryCreatedEvent(DeliveryCreatedEvent event) {
        log.info("Publishing DeliveryCreatedEvent to Kafka. Event ID: {}, Correlation ID: {}, Delivery ID: {}, Order ID: {}", 
                event.getEventId(), event.getCorrelationId(), event.getDeliveryId(), event.getOrderId());
        
        kafkaTemplate.send(KafkaConfig.DELIVERY_CREATED_TOPIC, event.getOrderId().toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex == null) {
                        log.info("Successfully published DeliveryCreatedEvent with offset: {}", 
                                result.getRecordMetadata().offset());
                    } else {
                        log.error("Failed to publish DeliveryCreatedEvent", ex);
                    }
                });
    }
}
