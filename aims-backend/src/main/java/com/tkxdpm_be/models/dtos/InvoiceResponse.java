package com.tkxdpm_be.models.dtos;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.entities.Order;
import com.tkxdpm_be.entities.OrderItem;
import com.tkxdpm_be.entities.OrderShipping;
import lombok.Data;

import java.util.List;

@Data
public class InvoiceResponse {
    private Order oder;
    private OrderShipping orderShipping;
    private List<OrderItem> orderItemList;

//    private Long invoice;
}
