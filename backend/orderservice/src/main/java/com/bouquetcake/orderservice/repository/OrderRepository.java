package com.bouquetcake.orderservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bouquetcake.orderservice.entity.CustomerOrder;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findByUserId(Long userId);
}