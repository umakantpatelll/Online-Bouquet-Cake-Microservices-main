package com.bouquetcake.orderservice.controller;

import com.bouquetcake.orderservice.dto.request.CreateOrderRequest;
import com.bouquetcake.orderservice.dto.request.UpdateOrderStatusRequest;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.OrderResponse;
import com.bouquetcake.orderservice.entity.OrderStatus;
import com.bouquetcake.orderservice.service.OrderService;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> placeOrder(@RequestBody CreateOrderRequest request) {
        OrderResponse response = orderService.placeOrder(request);
        ApiResponse<OrderResponse> apiResponse = ApiResponse.<OrderResponse>builder()
                .success(true)
                .message("Order Placed Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
        List<OrderResponse> response = orderService.getAllOrders();
        ApiResponse<List<OrderResponse>> apiResponse = ApiResponse.<List<OrderResponse>>builder()
                .success(true)
                .message("Orders Fetched Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long id) {
        OrderResponse response = orderService.getOrderById(id);
        ApiResponse<OrderResponse> apiResponse = ApiResponse.<OrderResponse>builder()
                .success(true)
                .message("Order Fetched Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderResponse> response = orderService.getOrdersByUserId(userId);
        ApiResponse<List<OrderResponse>> apiResponse = ApiResponse.<List<OrderResponse>>builder()
                .success(true)
                .message("User Orders Fetched Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody UpdateOrderStatusRequest request) {

        OrderResponse response = orderService.updateOrderStatus(id, request.getStatus());
        ApiResponse<OrderResponse> apiResponse = ApiResponse.<OrderResponse>builder()
                .success(true)
                .message("Order Status Updated Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<String>> cancelOrder(@PathVariable Long id) {
        String result = orderService.cancelOrder(id);
        ApiResponse<String> apiResponse = ApiResponse.<String>builder()
                .success(true)
                .message("Order Cancelled Successfully")
                .data(result)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}