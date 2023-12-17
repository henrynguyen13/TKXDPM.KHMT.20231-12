package com.tkxdpm_be.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "medias")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String category;
    private Integer price;
    private Integer quantity;
    private String title;
    private Integer value;
    private String imageUrl;
}
