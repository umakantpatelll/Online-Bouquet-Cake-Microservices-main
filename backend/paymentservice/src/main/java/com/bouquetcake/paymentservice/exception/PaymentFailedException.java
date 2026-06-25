package com.bouquetcake.paymentservice.exception;

public class PaymentFailedException extends BadRequestException {
    public PaymentFailedException(String message) {
        super(message);
    }
}
