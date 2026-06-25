package com.bouquetcake.productservices.dto.request;

import com.bouquetcake.productservices.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Integer stock;
    private Category category;
}
