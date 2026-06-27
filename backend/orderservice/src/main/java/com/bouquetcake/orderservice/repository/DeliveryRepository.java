package com.bouquetcake.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bouquetcake.orderservice.entity.Delivery;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}
