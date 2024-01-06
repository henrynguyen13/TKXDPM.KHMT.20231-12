package com.tkxdpm_be.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class MediaInOrderDTO {
    private Long id;
    private String mainImg;
    private String title;
    private Integer quantity;
    private Double price;
}
