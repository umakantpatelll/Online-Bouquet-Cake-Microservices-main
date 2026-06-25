package com.bouquetcake.deliveryservice.dto.response;

import com.bouquetcake.deliveryservice.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryResponse {
    private Long id;
    private Long orderId;
    private String deliveryAddress;
    private DeliveryStatus status;
}
