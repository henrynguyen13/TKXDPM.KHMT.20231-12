package com.tkxdpm_be.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "medias")
@NoArgsConstructor
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String type;
    private String author;
    private String imageUrl;
    private String description;
    private Double value;
    private Double price;
    private Integer quantityAvailable;
    private Double weight;
    private Boolean isRush;
    private String metaData;

    public Media(Integer quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }
}
