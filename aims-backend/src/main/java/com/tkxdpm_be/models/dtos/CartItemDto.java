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
    private String imageUrl;
    private Double price;
    private Integer quantityAvailable;
    private Integer quantity;
    private Double weight;
    private Boolean isRush;
}