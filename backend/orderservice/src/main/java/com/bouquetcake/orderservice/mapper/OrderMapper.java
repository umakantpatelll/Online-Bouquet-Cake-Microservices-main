package com.bouquetcake.orderservice.mapper;

import com.bouquetcake.orderservice.dto.response.DeliveryResponse;
import com.bouquetcake.orderservice.dto.response.OrderItemResponse;
import com.bouquetcake.orderservice.dto.response.OrderResponse;
import com.bouquetcake.orderservice.dto.response.OrderSummaryResponse;
import com.bouquetcake.orderservice.dto.response.PaymentResponse;
import com.bouquetcake.orderservice.dto.response.ProductResponse;
import com.bouquetcake.orderservice.dto.response.UserResponse;
import com.bouquetcake.orderservice.entity.CustomerOrder;
import com.bouquetcake.orderservice.entity.Delivery;
import com.bouquetcake.orderservice.entity.OrderItem;
import com.bouquetcake.orderservice.entity.Payment;
import com.bouquetcake.orderservice.entity.Product;
import com.bouquetcake.orderservice.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderResponse toResponse(CustomerOrder order);

    @Mapping(target = "userId", source = "user.id")
    OrderSummaryResponse toSummaryResponse(CustomerOrder order);

    List<OrderSummaryResponse> toSummaryResponseList(List<CustomerOrder> orders);

    UserResponse toUserResponse(User user);

    ProductResponse toProductResponse(Product product);

    OrderItemResponse toOrderItemResponse(OrderItem item);

    PaymentResponse toPaymentResponse(Payment payment);

    DeliveryResponse toDeliveryResponse(Delivery delivery);
}
