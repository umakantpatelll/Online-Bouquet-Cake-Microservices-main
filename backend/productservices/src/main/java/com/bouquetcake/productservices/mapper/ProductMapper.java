package com.bouquetcake.productservices.mapper;

import com.bouquetcake.productservices.dto.response.ProductResponse;
import com.bouquetcake.productservices.dto.response.ProductSummaryResponse;
import com.bouquetcake.productservices.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product product) {
        if (product == null) return null;
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .stock(product.getStock())
                .category(product.getCategory())
                .createdAt(product.getCreatedAt())
                .build();
    }

    public ProductSummaryResponse toSummaryResponse(Product product) {
        if (product == null) return null;
        return ProductSummaryResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .category(product.getCategory())
                .build();
    }
}
