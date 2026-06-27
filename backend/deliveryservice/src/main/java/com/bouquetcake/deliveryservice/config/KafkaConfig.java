package com.bouquetcake.deliveryservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    public static final String DELIVERY_CREATED_TOPIC = "delivery-created";

    @Bean
    public NewTopic deliveryCreatedTopic() {
        return TopicBuilder.name(DELIVERY_CREATED_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}
