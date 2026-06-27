package com.bouquetcake.deliveryservice.controller;

import com.bouquetcake.deliveryservice.dto.request.CreateDeliveryRequest;
import com.bouquetcake.deliveryservice.dto.request.UpdateDeliveryStatusRequest;
import com.bouquetcake.deliveryservice.dto.response.ApiResponse;
import com.bouquetcake.deliveryservice.dto.response.DeliveryResponse;
import com.bouquetcake.deliveryservice.entity.DeliveryStatus;
import com.bouquetcake.deliveryservice.service.DeliveryService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/deliveries")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<DeliveryResponse>> createDelivery(@Valid @RequestBody CreateDeliveryRequest request) {
        DeliveryResponse response = deliveryService.createDelivery(request);
        ApiResponse<DeliveryResponse> apiResponse = ApiResponse.<DeliveryResponse>builder()
                .success(true)
                .message("Delivery Created Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<DeliveryResponse>>> getAllDeliveries() {
        List<DeliveryResponse> response = deliveryService.getAllDeliveries();
        ApiResponse<List<DeliveryResponse>> apiResponse = ApiResponse.<List<DeliveryResponse>>builder()
                .success(true)
                .message("Deliveries Fetched Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DELIVERY')")
    public ResponseEntity<ApiResponse<DeliveryResponse>> getDeliveryById(@PathVariable Long id) {
        DeliveryResponse response = deliveryService.getDeliveryById(id);
        ApiResponse<DeliveryResponse> apiResponse = ApiResponse.<DeliveryResponse>builder()
                .success(true)
                .message("Delivery Fetched Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DELIVERY')")
    public ResponseEntity<ApiResponse<DeliveryResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateDeliveryStatusRequest request
    ) {
        DeliveryResponse response = deliveryService.updateStatus(id, request.getStatus());
        ApiResponse<DeliveryResponse> apiResponse = ApiResponse.<DeliveryResponse>builder()
                .success(true)
                .message("Delivery Status Updated Successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}