package com.bouquetcake.productservices.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bouquetcake.productservices.entity.Category;
import com.bouquetcake.productservices.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);
}