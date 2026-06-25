package com.bouquetcake.deliveryservice.mapper;

import com.bouquetcake.deliveryservice.dto.response.DeliveryResponse;
import com.bouquetcake.deliveryservice.entity.Delivery;
import org.springframework.stereotype.Component;

@Component
public class DeliveryMapper {

    public DeliveryResponse toResponse(Delivery delivery) {
        if (delivery == null) return null;
        return DeliveryResponse.builder()
                .id(delivery.getId())
                .orderId(delivery.getOrderId())
                .deliveryAddress(delivery.getDeliveryAddress())
                .status(delivery.getStatus())
                .build();
    }
}
