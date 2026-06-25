package com.bouquetcake.authservice.exception;

public class AuthenticationFailedException extends UnauthorizedException {
    public AuthenticationFailedException(String message) {
        super(message);
    }
}
