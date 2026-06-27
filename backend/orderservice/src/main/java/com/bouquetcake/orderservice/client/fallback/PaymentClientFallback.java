package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.PaymentClient;
import com.bouquetcake.orderservice.dto.request.CreatePaymentRequest;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.PaymentResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PaymentClientFallback implements PaymentClient {

    @Override
    public ApiResponse<PaymentResponse> makePayment(CreatePaymentRequest request) {
        PaymentResponse fallbackPayment = PaymentResponse.builder()
                .id(-1L)
                .amount(request.getAmount())
                .status("FAILED_FALLBACK")
                .build();

        return ApiResponse.<PaymentResponse>builder()
                .success(false)
                .message("Payment Service is unavailable. Transaction fallback triggered.")
                .data(fallbackPayment)
                .timestamp(LocalDateTime.now())
                .build();
    }

    @Override
    public ApiResponse<PaymentResponse> getPaymentById(Long id) {
        return ApiResponse.<PaymentResponse>builder()
                .success(false)
                .message("Payment Service is unavailable. Fallback triggered.")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
