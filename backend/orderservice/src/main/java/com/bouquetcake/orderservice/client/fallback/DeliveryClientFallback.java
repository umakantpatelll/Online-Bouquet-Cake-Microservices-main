package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.DeliveryClient;
import com.bouquetcake.orderservice.dto.request.CreateDeliveryRequest;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.DeliveryResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DeliveryClientFallback implements DeliveryClient {

    @Override
    public ApiResponse<DeliveryResponse> createDelivery(CreateDeliveryRequest request) {
        DeliveryResponse fallbackDelivery = DeliveryResponse.builder()
                .id(-1L)
                .deliveryAddress(request.getDeliveryAddress())
                .status("FAILED_FALLBACK")
                .build();

        return ApiResponse.<DeliveryResponse>builder()
                .success(false)
                .message("Delivery Service is unavailable. Scheduling fallback triggered.")
                .data(fallbackDelivery)
                .timestamp(LocalDateTime.now())
                .build();
    }

    @Override
    public ApiResponse<DeliveryResponse> getDeliveryById(Long id) {
        return ApiResponse.<DeliveryResponse>builder()
                .success(false)
                .message("Delivery Service is unavailable. Fallback triggered.")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
