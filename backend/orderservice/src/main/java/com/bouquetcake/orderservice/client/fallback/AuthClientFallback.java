package com.bouquetcake.orderservice.client.fallback;

import com.bouquetcake.orderservice.client.AuthClient;
import com.bouquetcake.orderservice.dto.response.ApiResponse;
import com.bouquetcake.orderservice.dto.response.UserResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AuthClientFallback implements AuthClient {

    @Override
    public ApiResponse<UserResponse> getUserById(Long id) {
        UserResponse fallbackUser = UserResponse.builder()
                .id(id)
                .name("Fallback User")
                .email("fallback@cake.com")
                .role("ROLE_CUSTOMER")
                .build();

        return ApiResponse.<UserResponse>builder()
                .success(true)
                .message("Auth Service is down, returning fallback user info.")
                .data(fallbackUser)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
