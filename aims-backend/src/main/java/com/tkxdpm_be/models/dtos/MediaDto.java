package com.tkxdpm_be.models.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MediaDto {

    private  String title;

    private  String imageUrl;

    private  Double price;
}
