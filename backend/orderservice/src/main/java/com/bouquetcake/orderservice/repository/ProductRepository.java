package com.bouquetcake.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bouquetcake.orderservice.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
