package com.bouquetcake.orderservice.exception;

public class AuthServiceUnavailableException extends ServiceUnavailableException {
    public AuthServiceUnavailableException(String message) {
        super(message);
    }
}
