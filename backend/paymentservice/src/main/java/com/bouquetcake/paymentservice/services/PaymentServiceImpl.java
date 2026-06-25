package com.bouquetcake.paymentservice.services;

import com.bouquetcake.paymentservice.dto.request.CreatePaymentRequest;
import com.bouquetcake.paymentservice.dto.response.PaymentResponse;
import com.bouquetcake.paymentservice.entity.Payment;
import com.bouquetcake.paymentservice.entity.PaymentStatus;
import com.bouquetcake.paymentservice.mapper.PaymentMapper;
import com.bouquetcake.paymentservice.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;
import java.util.stream.Collectors;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    @Override
    public PaymentResponse makePayment(CreatePaymentRequest request) {
        Payment payment = Payment.builder()
                .orderId(request.getOrderId())
                .amount(request.getAmount())
                .status(PaymentStatus.SUCCESS)
                .build();

        Payment savedPayment = paymentRepository.save(payment);
        return paymentMapper.toResponse(savedPayment);
    }

    @Override
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponse getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return paymentMapper.toResponse(payment);
    }
}