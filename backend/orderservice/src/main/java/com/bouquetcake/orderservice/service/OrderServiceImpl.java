package com.bouquetcake.orderservice.service;

import com.bouquetcake.orderservice.client.AuthClient;
import com.bouquetcake.orderservice.client.ProductClient;
import com.bouquetcake.orderservice.dto.request.CreateOrderRequest;
import com.bouquetcake.orderservice.dto.request.OrderItemRequest;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.OrderResponse;
import com.bouquetcake.orderservice.dto.response.ProductResponse;
import com.bouquetcake.orderservice.dto.response.UserResponse;
import com.bouquetcake.orderservice.entity.CustomerOrder;
import com.bouquetcake.orderservice.entity.OrderItem;
import com.bouquetcake.orderservice.entity.OrderStatus;
import com.bouquetcake.orderservice.entity.Product;
import com.bouquetcake.orderservice.entity.User;
import com.bouquetcake.orderservice.mapper.OrderMapper;
import com.bouquetcake.orderservice.repository.OrderRepository;
import com.bouquetcake.orderservice.repository.ProductRepository;
import com.bouquetcake.orderservice.repository.UserRepository;
import com.bouquetcake.orderservice.exception.OrderNotFoundException;
import com.bouquetcake.orderservice.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.bouquetcake.orderservice.event.OrderCreatedEvent;
import com.bouquetcake.orderservice.event.OrderKafkaProducer;
import org.slf4j.MDC;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final AuthClient authClient;
    private final ProductClient productClient;
    private final OrderKafkaProducer orderKafkaProducer;

    @Override
    @Transactional
    public OrderResponse placeOrder(CreateOrderRequest request) {
        // Find or sync user
        User user = userRepository.findById(request.getUserId())
                .orElseGet(() -> {
                    try {
                        ApiResponse<UserResponse> userApiResponse = authClient.getUserById(request.getUserId());
                        if (userApiResponse == null || !userApiResponse.isSuccess() || userApiResponse.getData() == null) {
                            throw new ResourceNotFoundException("User not found with id: " + request.getUserId());
                        }
                        UserResponse userRes = userApiResponse.getData();
                        User newUser = User.builder()
                                .id(userRes.getId())
                                .name(userRes.getName())
                                .email(userRes.getEmail())
                                .role(userRes.getRole())
                                .build();
                        return userRepository.save(newUser);
                    } catch (Exception e) {
                        throw new ResourceNotFoundException("Failed to fetch user with id: " + request.getUserId() + ". Error: " + e.getMessage());
                    }
                });

        CustomerOrder order = CustomerOrder.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .orderDate(LocalDateTime.now())
                .build();

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderItemRequest itemReq : request.getItems()) {
            // Find or sync product
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseGet(() -> {
                        try {
                            ApiResponse<ProductResponse> productApiResponse = productClient.getProductById(itemReq.getProductId());
                            if (productApiResponse == null || !productApiResponse.isSuccess() || productApiResponse.getData() == null) {
                                throw new ResourceNotFoundException("Product not found with id: " + itemReq.getProductId());
                            }
                            ProductResponse prodRes = productApiResponse.getData();
                            Product newProduct = Product.builder()
                                    .id(prodRes.getId())
                                    .name(prodRes.getName())
                                    .price(prodRes.getPrice())
                                    .description(prodRes.getDescription())
                                    .category(prodRes.getCategory())
                                    .imageUrl(prodRes.getImageUrl())
                                    .build();
                            return productRepository.save(newProduct);
                        } catch (Exception e) {
                            throw new ResourceNotFoundException("Failed to fetch product with id: " + itemReq.getProductId() + ". Error: " + e.getMessage());
                        }
                    });

            double itemPrice = product.getPrice();
            totalAmount += itemPrice * itemReq.getQuantity();

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .price(itemPrice)
                    .order(order)
                    .build();
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        CustomerOrder savedOrder = orderRepository.save(order);

        String correlationId = MDC.get("correlationId");
        if (correlationId == null || correlationId.isEmpty()) {
            correlationId = UUID.randomUUID().toString();
        }

        List<OrderCreatedEvent.OrderItemInfo> itemInfos = savedOrder.getItems().stream()
                .map(item -> OrderCreatedEvent.OrderItemInfo.builder()
                        .productId(item.getProduct().getId())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build())
                .collect(Collectors.toList());

        OrderCreatedEvent event = OrderCreatedEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .eventTimestamp(LocalDateTime.now().toString())
                .eventType("OrderCreatedEvent")
                .correlationId(correlationId)
                .version("v1")
                .orderId(savedOrder.getId())
                .userId(savedOrder.getUser().getId())
                .totalAmount(savedOrder.getTotalAmount())
                .items(itemInfos)
                .build();

        orderKafkaProducer.sendOrderCreatedEvent(event);

        return orderMapper.toResponse(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(Long id, OrderStatus status) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
        order.setStatus(status);
        CustomerOrder updatedOrder = orderRepository.save(order);
        return orderMapper.toResponse(updatedOrder);
    }

    @Override
    @Transactional
    public String cancelOrder(Long id) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return "Order cancelled successfully";
    }
}