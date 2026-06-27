package com.bouquetcake.orderservice.exception;

public class ProductServiceUnavailableException extends ServiceUnavailableException {
    public ProductServiceUnavailableException(String message) {
        super(message);
    }
}
