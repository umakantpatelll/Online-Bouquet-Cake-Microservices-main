package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.ProductClient;
import com.bouquetcake.orderservice.exception.*;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

@Component
public class ProductClientFallbackFactory implements FallbackFactory<ProductClient> {

    private final ProductClientFallback productClientFallback;

    public ProductClientFallbackFactory(ProductClientFallback productClientFallback) {
        this.productClientFallback = productClientFallback;
    }

    @Override
    public ProductClient create(Throwable cause) {
        Throwable current = cause;
        while (current != null) {
            if (current instanceof BadRequestException ||
                current instanceof ResourceNotFoundException ||
                current instanceof UnauthorizedException ||
                current instanceof ForbiddenException ||
                current instanceof DuplicateResourceException) {
                throw (RuntimeException) current;
            }
            current = current.getCause();
        }
        return productClientFallback;
    }
}
