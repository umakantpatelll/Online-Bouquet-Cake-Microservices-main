package com.bouquetcake.productservices.service;

import java.util.List;

import com.bouquetcake.productservices.dto.request.CreateProductRequest;
import com.bouquetcake.productservices.dto.request.UpdateProductRequest;
import com.bouquetcake.productservices.dto.response.ProductResponse;
import com.bouquetcake.productservices.entity.Category;

public interface ProductService {

    ProductResponse addProduct(CreateProductRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    List<ProductResponse> getProductsByCategory(Category category);

    ProductResponse updateProduct(Long id, UpdateProductRequest request);

    String deleteProduct(Long id);
}