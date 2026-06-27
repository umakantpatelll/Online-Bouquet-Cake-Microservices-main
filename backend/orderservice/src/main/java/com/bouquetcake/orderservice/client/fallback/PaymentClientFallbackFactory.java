package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.PaymentClient;
import com.bouquetcake.orderservice.exception.*;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

@Component
public class PaymentClientFallbackFactory implements FallbackFactory<PaymentClient> {

    private final PaymentClientFallback paymentClientFallback;

    public PaymentClientFallbackFactory(PaymentClientFallback paymentClientFallback) {
        this.paymentClientFallback = paymentClientFallback;
    }

    @Override
    public PaymentClient create(Throwable cause) {
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
        return paymentClientFallback;
    }
}
