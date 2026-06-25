package com.bouquetcake.productservices.dto.response;

import com.bouquetcake.productservices.entity.Category;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Integer stock;
    private Category category;
    private LocalDateTime createdAt;
}
