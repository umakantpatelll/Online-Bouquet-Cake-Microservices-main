package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.AuthClient;
import com.bouquetcake.orderservice.exception.*;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

@Component
public class AuthClientFallbackFactory implements FallbackFactory<AuthClient> {

    private final AuthClientFallback authClientFallback;

    public AuthClientFallbackFactory(AuthClientFallback authClientFallback) {
        this.authClientFallback = authClientFallback;
    }

    @Override
    public AuthClient create(Throwable cause) {
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
        return authClientFallback;
    }
}
