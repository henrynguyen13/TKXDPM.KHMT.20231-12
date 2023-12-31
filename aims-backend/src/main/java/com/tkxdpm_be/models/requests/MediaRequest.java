package com.tkxdpm_be.models.requests;

import lombok.Data;

@Data
public class MediaRequest {
    private Long id;
    private String title;
    private String type;
    private String author;
    private String imageUrl;
    private String description;
    private Double value;
    private Double price;
    private Integer quantity;
    private Double weight;
    private Boolean isRush;
    private String metaData;
}
