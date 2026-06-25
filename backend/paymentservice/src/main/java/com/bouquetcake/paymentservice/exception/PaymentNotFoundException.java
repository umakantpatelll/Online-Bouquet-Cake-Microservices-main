package com.bouquetcake.paymentservice.exception;

public class PaymentNotFoundException extends ResourceNotFoundException {
    public PaymentNotFoundException(String message) {
        super(message);
    }
}
