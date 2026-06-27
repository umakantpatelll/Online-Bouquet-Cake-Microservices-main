package com.bouquetcake.orderservice.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class FeignClientInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                template.header(HttpHeaders.AUTHORIZATION, authHeader);
            }
            String correlationId = request.getHeader("X-Correlation-Id");
            if (correlationId == null || correlationId.trim().isEmpty()) {
                correlationId = org.slf4j.MDC.get("correlationId");
            }
            if (correlationId != null && !correlationId.trim().isEmpty()) {
                template.header("X-Correlation-Id", correlationId);
            }
        }
    }
}
