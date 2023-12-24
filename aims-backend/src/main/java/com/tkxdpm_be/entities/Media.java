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
    private String title;
    private String type;
    private String author;
    private String imageUrl;
    private String description;
    private double price;
    private int quantityAvailable;
}
