package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.DeliveryClient;
import com.bouquetcake.orderservice.exception.*;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

@Component
public class DeliveryClientFallbackFactory implements FallbackFactory<DeliveryClient> {

    private final DeliveryClientFallback deliveryClientFallback;

    public DeliveryClientFallbackFactory(DeliveryClientFallback deliveryClientFallback) {
        this.deliveryClientFallback = deliveryClientFallback;
    }

    @Override
    public DeliveryClient create(Throwable cause) {
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
        return deliveryClientFallback;
    }
}
