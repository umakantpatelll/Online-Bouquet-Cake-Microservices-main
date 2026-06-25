package com.bouquetcake.authservice.service;

import com.bouquetcake.authservice.dto.request.LoginRequest;
import com.bouquetcake.authservice.dto.request.RegisterRequest;
import com.bouquetcake.authservice.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}