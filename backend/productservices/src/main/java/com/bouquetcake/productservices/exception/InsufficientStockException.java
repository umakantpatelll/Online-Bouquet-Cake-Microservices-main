package com.bouquetcake.productservices.exception;

public class InsufficientStockException extends BadRequestException {
    public InsufficientStockException(String message) {
        super(message);
    }
}
