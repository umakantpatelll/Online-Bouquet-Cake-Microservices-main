package com.bouquetcake.orderservice.client;

import com.bouquetcake.orderservice.client.fallback.PaymentClientFallbackFactory;
import com.bouquetcake.orderservice.dto.request.CreatePaymentRequest;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.PaymentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PAYMENT-SERVICE", fallbackFactory = PaymentClientFallbackFactory.class)
public interface PaymentClient {

    @PostMapping("/payments")
    ApiResponse<PaymentResponse> makePayment(@RequestBody CreatePaymentRequest request);

    @GetMapping("/payments/{id}")
    ApiResponse<PaymentResponse> getPaymentById(@PathVariable("id") Long id);
}
