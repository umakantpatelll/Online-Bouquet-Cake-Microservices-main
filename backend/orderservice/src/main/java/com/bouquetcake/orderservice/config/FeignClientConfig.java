package com.bouquetcake.orderservice.config;

import com.bouquetcake.orderservice.exception.*;
import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FeignClientConfig {

    @Bean
    public ErrorDecoder errorDecoder() {
        return new CustomFeignErrorDecoder();
    }

    public static class CustomFeignErrorDecoder implements ErrorDecoder {
        private final ErrorDecoder defaultErrorDecoder = new Default();

        @Override
        public Exception decode(String methodKey, Response response) {
            String requestUrl = response.request().url();
            int status = response.status();

            String message = "Feign communication error";
            if (response.body() != null) {
                try (InputStream bodyIs = response.body().asInputStream()) {
                    String body = new String(bodyIs.readAllBytes(), StandardCharsets.UTF_8);
                    if (body.contains("\"message\":\"")) {
                        int start = body.indexOf("\"message\":\"") + 11;
                        int end = body.indexOf("\"", start);
                        if (end > start) {
                            message = body.substring(start, end);
                        } else {
                            message = body;
                        }
                    } else {
                        message = body;
                    }
                } catch (Exception e) {
                    // Ignore
                }
            }

            if (status == 400) {
                return new BadRequestException(message);
            }
            if (status == 404) {
                return new ResourceNotFoundException(message);
            }

            // Map 5xx and others to specific Unavailable exceptions based on requested URL
            if (requestUrl.contains("PRODUCT-SERVICE")) {
                return new ProductServiceUnavailableException("Product Service is currently unavailable. Original error: " + message);
            } else if (requestUrl.contains("AUTH-SERVICE")) {
                return new AuthServiceUnavailableException("Auth Service is currently unavailable. Original error: " + message);
            } else if (requestUrl.contains("PAYMENT-SERVICE")) {
                return new PaymentServiceUnavailableException("Payment Service is currently unavailable. Original error: " + message);
            } else if (requestUrl.contains("DELIVERY-SERVICE")) {
                return new DeliveryServiceUnavailableException("Delivery Service is currently unavailable. Original error: " + message);
            }

            return defaultErrorDecoder.decode(methodKey, response);
        }
    }
}
