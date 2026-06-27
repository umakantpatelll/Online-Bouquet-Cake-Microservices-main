package com.bouquetcake.deliveryservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCompletedEvent {
    private String eventId;
    private String eventTimestamp;
    private String eventType;
    private String correlationId;
    private String version;

    private Long paymentId;
    private Long orderId;
    private Double amount;
    private String status;
}
