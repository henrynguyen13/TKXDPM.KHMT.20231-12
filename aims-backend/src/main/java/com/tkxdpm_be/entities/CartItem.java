package com.tkxdpm_be.entities;

import com.tkxdpm_be.models.dtos.CartItemDto;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;
    private Long userId;
    private Long mediaId;
    private Integer quantity;
}
