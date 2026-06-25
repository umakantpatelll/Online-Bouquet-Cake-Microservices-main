package com.bouquetcake.paymentservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bouquetcake.paymentservice.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}