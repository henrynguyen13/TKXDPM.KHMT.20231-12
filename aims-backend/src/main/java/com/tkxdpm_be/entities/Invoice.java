package com.tkxdpm_be.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int amount;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

}
