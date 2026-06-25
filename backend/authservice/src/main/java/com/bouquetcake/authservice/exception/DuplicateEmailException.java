package com.bouquetcake.authservice.exception;

public class DuplicateEmailException extends DuplicateResourceException {
    public DuplicateEmailException(String message) {
        super(message);
    }
}
