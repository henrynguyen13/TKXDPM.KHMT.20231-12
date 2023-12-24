package com.tkxdpm_be.entities;

import com.tkxdpm_be.models.dtos.CartItemDto;
import lombok.Data;

import javax.persistence.*;

@SqlResultSetMapping(
        name = "CartItemDto",
        classes = {
                @ConstructorResult(
                        targetClass = CartItemDto.class,
                        columns = {
                                @ColumnResult(name = "cart_item_id", type = Long.class),
                                @ColumnResult(name = "media_id", type = Long.class),
                                @ColumnResult(name = "title", type = String.class),
                                @ColumnResult(name = "type", type = String.class),
                                @ColumnResult(name = "quantity", type = Integer.class),
                                @ColumnResult(name = "price", type = Double.class),
                                @ColumnResult(name = "description", type = String.class),
                                @ColumnResult(name = "author", type = String.class),
                                @ColumnResult(name = "image_url", type = String.class),
                        })})

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
