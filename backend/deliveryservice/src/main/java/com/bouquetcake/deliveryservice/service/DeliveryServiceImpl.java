package com.bouquetcake.deliveryservice.service;

import com.bouquetcake.deliveryservice.dto.request.CreateDeliveryRequest;
import com.bouquetcake.deliveryservice.dto.response.DeliveryResponse;
import com.bouquetcake.deliveryservice.entity.Delivery;
import com.bouquetcake.deliveryservice.entity.DeliveryStatus;
import com.bouquetcake.deliveryservice.mapper.DeliveryMapper;
import com.bouquetcake.deliveryservice.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import java.util.stream.Collectors;
import java.util.List;
import org.springframework.stereotype.Service;
import com.bouquetcake.deliveryservice.exception.DeliveryNotFoundException;

@Service
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final DeliveryMapper deliveryMapper;

    @Override
    public DeliveryResponse createDelivery(CreateDeliveryRequest request) {
        Delivery delivery = Delivery.builder()
                .orderId(request.getOrderId())
                .deliveryAddress(request.getDeliveryAddress())
                .status(DeliveryStatus.PENDING)
                .build();

        Delivery savedDelivery = deliveryRepository.save(delivery);
        return deliveryMapper.toResponse(savedDelivery);
    }

    @Override
    public List<DeliveryResponse> getAllDeliveries() {
        return deliveryRepository.findAll().stream()
                .map(deliveryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DeliveryResponse getDeliveryById(Long id) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with id: " + id));
        return deliveryMapper.toResponse(delivery);
    }

    @Override
    public DeliveryResponse updateStatus(Long id, DeliveryStatus status) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with id: " + id));
        delivery.setStatus(status);
        Delivery updatedDelivery = deliveryRepository.save(delivery);
        return deliveryMapper.toResponse(updatedDelivery);
    }
}