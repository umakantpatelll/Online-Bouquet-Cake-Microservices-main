package com.bouquetcake.orderservice.dto.response;

import com.bouquetcake.orderservice.entity.OrderStatus;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private UserResponse user;
    private List<OrderItemResponse> items;
    private PaymentResponse payment;
    private DeliveryResponse delivery;
    private Double totalAmount;
    private OrderStatus status;
    private LocalDateTime orderDate;
}
