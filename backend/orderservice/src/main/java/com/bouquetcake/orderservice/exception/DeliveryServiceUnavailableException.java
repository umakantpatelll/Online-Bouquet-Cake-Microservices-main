package com.bouquetcake.orderservice.exception;

public class DeliveryServiceUnavailableException extends ServiceUnavailableException {
    public DeliveryServiceUnavailableException(String message) {
        super(message);
    }
}
