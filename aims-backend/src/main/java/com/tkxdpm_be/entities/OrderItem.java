package com.tkxdpm_be.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;
    private Long orderId;
    private Long mediaId;
    private int quantity;
}
