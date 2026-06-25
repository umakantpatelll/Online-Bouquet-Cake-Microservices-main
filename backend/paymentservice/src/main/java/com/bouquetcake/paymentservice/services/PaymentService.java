package com.bouquetcake.paymentservice.services;

import java.util.List;

import com.bouquetcake.paymentservice.dto.request.CreatePaymentRequest;
import com.bouquetcake.paymentservice.dto.response.PaymentResponse;

public interface PaymentService {

    PaymentResponse makePayment(CreatePaymentRequest request);

    List<PaymentResponse> getAllPayments();

    PaymentResponse getPaymentById(Long id);
}