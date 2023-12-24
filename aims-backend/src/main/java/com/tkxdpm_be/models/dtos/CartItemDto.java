package com.tkxdpm_be.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long cartItemId;
    private Long mediaId;
    private String title;
    private String type;
    private Integer quantity;
    private Double price;
    private String description;
    private String author;
    private String imageUrl;
}