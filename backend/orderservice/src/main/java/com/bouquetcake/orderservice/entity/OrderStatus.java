package com.bouquetcake.orderservice.entity;

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    PREPARING,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
}