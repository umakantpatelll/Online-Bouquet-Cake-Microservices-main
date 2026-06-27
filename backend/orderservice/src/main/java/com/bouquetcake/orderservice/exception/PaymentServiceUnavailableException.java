package com.bouquetcake.orderservice.exception;

public class PaymentServiceUnavailableException extends ServiceUnavailableException {
    public PaymentServiceUnavailableException(String message) {
        super(message);
    }
}
