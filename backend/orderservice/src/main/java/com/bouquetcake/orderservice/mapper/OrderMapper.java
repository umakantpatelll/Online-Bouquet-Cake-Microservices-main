package com.bouquetcake.orderservice.mapper;

import com.bouquetcake.orderservice.dto.response.OrderResponse;
import com.bouquetcake.orderservice.dto.response.OrderSummaryResponse;
import com.bouquetcake.orderservice.entity.CustomerOrder;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderResponse toResponse(CustomerOrder order) {
        if (order == null) return null;
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .build();
    }

    public OrderSummaryResponse toSummaryResponse(CustomerOrder order) {
        if (order == null) return null;
        return OrderSummaryResponse.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .build();
    }
}
