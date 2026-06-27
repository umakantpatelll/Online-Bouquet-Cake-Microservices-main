package com.bouquetcake.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bouquetcake.orderservice.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
