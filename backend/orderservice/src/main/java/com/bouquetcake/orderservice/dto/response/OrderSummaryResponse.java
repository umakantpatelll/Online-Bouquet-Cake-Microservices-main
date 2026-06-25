package com.bouquetcake.orderservice.dto.response;

import com.bouquetcake.orderservice.entity.OrderStatus;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummaryResponse {
    private Long id;
    private Double totalAmount;
    private OrderStatus status;
    private LocalDateTime orderDate;
}
