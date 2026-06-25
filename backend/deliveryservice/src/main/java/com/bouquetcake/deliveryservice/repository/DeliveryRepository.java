package com.bouquetcake.deliveryservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bouquetcake.deliveryservice.entity.Delivery;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}