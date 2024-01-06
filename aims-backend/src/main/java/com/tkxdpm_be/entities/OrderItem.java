package com.tkxdpm_be.entities;

import com.tkxdpm_be.models.dtos.CartItemDto;
import com.tkxdpm_be.models.dtos.OrderItemDto;
import lombok.Data;

import javax.persistence.*;

@SqlResultSetMapping(
        name = "OrderItemDto",
        classes = {
                @ConstructorResult(
                        targetClass = OrderItemDto.class,
                        columns = {
                                @ColumnResult(name = "order_item_id", type = Long.class),
                                @ColumnResult(name = "media_id", type = Long.class),
                                @ColumnResult(name = "title", type = String.class),
                                @ColumnResult(name = "image_url", type = String.class),
                                @ColumnResult(name = "price", type = Double.class),
                                @ColumnResult(name = "quantity_available", type = Integer.class),
                                @ColumnResult(name = "quantity", type = Integer.class),
                                @ColumnResult(name = "weight", type = Double.class),
                                @ColumnResult(name = "is_rush", type = Boolean.class),
                        })})

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
