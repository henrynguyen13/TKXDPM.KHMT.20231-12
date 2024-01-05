package com.tkxdpm_be.models.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MediaTO {
    private Long id;
    private String title;
    private String imageUrl;
    private Double price;
    private int quantity;
}
