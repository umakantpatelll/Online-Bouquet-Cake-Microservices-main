package com.bouquetcake.deliveryservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryCreatedEvent {
    private String eventId;
    private String eventTimestamp;
    private String eventType;
    private String correlationId;
    private String version;

    private Long deliveryId;
    private Long orderId;
    private String deliveryAddress;
    private String status;
}
