package com.tkxdpm_be.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String author;
    private String coverType;
    private String publisher;
    private Date publishDate;
    private Integer numOfPages;
    private String language;
    private String bookCategory;
}
