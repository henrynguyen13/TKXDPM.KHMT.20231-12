package com.tkxdpm_be.models.dtos;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.entities.OrderItem;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class OrderDTO {
    private Long id;
    private Double totalAmount;
    private Double originPrice;
    private Double vat;
    private Double shippingFee;
    private List<MediaTO> medias;
    private List<OrderItem> orderItems;


}
