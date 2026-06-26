package com.bouquetcake.deliveryservice.exception;

public class DeliveryNotFoundException extends ResourceNotFoundException {
    public DeliveryNotFoundException(String message) {
        super(message);
    }
}
