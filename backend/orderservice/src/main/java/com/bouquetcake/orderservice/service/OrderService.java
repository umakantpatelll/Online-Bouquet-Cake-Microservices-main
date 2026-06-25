package com.bouquetcake.orderservice.service;

import java.util.List;

import com.bouquetcake.orderservice.dto.request.CreateOrderRequest;
import com.bouquetcake.orderservice.dto.response.OrderResponse;
import com.bouquetcake.orderservice.entity.OrderStatus;

public interface OrderService {

    OrderResponse placeOrder(CreateOrderRequest request);

    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(Long id);

    List<OrderResponse> getOrdersByUserId(Long userId);

    OrderResponse updateOrderStatus(Long id, OrderStatus status);

    String cancelOrder(Long id);
}