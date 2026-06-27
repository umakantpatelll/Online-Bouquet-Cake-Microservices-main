package com.bouquetcake.orderservice.client;

import com.bouquetcake.orderservice.client.fallback.DeliveryClientFallbackFactory;
import com.bouquetcake.orderservice.dto.request.CreateDeliveryRequest;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.DeliveryResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "DELIVERY-SERVICE", fallbackFactory = DeliveryClientFallbackFactory.class)
public interface DeliveryClient {

    @PostMapping("/deliveries")
    ApiResponse<DeliveryResponse> createDelivery(@RequestBody CreateDeliveryRequest request);

    @GetMapping("/deliveries/{id}")
    ApiResponse<DeliveryResponse> getDeliveryById(@PathVariable("id") Long id);
}
