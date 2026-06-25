package com.bouquetcake.deliveryservice.dto.request;

import com.bouquetcake.deliveryservice.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDeliveryStatusRequest {
    private DeliveryStatus status;
}
