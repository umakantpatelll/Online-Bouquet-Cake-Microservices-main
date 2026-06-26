package com.bouquetcake.deliveryservice.exception;

public class InvalidDeliveryStatusException extends BadRequestException {
    public InvalidDeliveryStatusException(String message) {
        super(message);
    }
}
