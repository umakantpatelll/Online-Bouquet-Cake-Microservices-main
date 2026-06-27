package com.bouquetcake.orderservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.UserResponse;

import com.bouquetcake.orderservice.client.fallback.AuthClientFallbackFactory;

@FeignClient(name = "AUTH-SERVICE", fallbackFactory = AuthClientFallbackFactory.class)
public interface AuthClient {

    @GetMapping("/api/auth/users/{id}")
    ApiResponse<UserResponse> getUserById(@PathVariable("id") Long id);
}
