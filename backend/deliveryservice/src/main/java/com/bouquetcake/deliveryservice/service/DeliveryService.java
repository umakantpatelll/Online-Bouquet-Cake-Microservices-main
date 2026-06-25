package com.bouquetcake.deliveryservice.service;

import java.util.List;

import com.bouquetcake.deliveryservice.dto.request.CreateDeliveryRequest;
import com.bouquetcake.deliveryservice.dto.response.DeliveryResponse;
import com.bouquetcake.deliveryservice.entity.DeliveryStatus;

public interface DeliveryService {

    DeliveryResponse createDelivery(CreateDeliveryRequest request);

    List<DeliveryResponse> getAllDeliveries();

    DeliveryResponse getDeliveryById(Long id);

    DeliveryResponse updateStatus(Long id, DeliveryStatus status);
}