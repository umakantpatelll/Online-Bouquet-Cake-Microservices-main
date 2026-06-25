package com.bouquetcake.productservices.dto.response;

import com.bouquetcake.productservices.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSummaryResponse {
    private Long id;
    private String name;
    private Double price;
    private String imageUrl;
    private Category category;
}
