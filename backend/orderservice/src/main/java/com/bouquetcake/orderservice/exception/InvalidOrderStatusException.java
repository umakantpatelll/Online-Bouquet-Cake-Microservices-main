package com.bouquetcake.orderservice.exception;

public class InvalidOrderStatusException extends BadRequestException {
    public InvalidOrderStatusException(String message) {
        super(message);
    }
}
