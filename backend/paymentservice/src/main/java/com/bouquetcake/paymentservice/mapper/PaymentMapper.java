package com.bouquetcake.paymentservice.mapper;

import com.bouquetcake.paymentservice.dto.response.PaymentResponse;
import com.bouquetcake.paymentservice.dto.response.PaymentStatusResponse;
import com.bouquetcake.paymentservice.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentResponse toResponse(Payment payment) {
        if (payment == null) return null;
        return PaymentResponse.builder()
                .id(payment.getId())
                .orderId(payment.getOrderId())
                .amount(payment.getAmount())
                .status(payment.getStatus())
                .build();
    }

    public PaymentStatusResponse toStatusResponse(Payment payment) {
        if (payment == null) return null;
        return PaymentStatusResponse.builder()
                .id(payment.getId())
                .status(payment.getStatus())
                .build();
    }
}
