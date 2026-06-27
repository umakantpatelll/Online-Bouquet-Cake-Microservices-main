package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.ProductClient;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.ProductResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ProductClientFallback implements ProductClient {

    @Override
    public ApiResponse<ProductResponse> getProductById(Long id) {
        ProductResponse fallbackProduct = ProductResponse.builder()
                .id(id)
                .name("Fallback Bouquet/Cake")
                .description("The Product Service is temporarily unavailable. Returning fallback info.")
                .price(100.0)
                .imageUrl("http://example.com/fallback.jpg")
                .category(null)
                .build();

        return ApiResponse.<ProductResponse>builder()
                .success(true) // success=true allows Order Placement logic to proceed gracefully without crashing
                .message("Product Service is down, returning fallback product info.")
                .data(fallbackProduct)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
