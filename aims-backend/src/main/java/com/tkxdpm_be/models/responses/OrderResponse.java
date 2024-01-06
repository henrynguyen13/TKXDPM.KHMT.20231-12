package com.tkxdpm_be.models.responses;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.entities.Order;
import com.tkxdpm_be.entities.OrderShipping;
import com.tkxdpm_be.models.dtos.CartItemDto;
import com.tkxdpm_be.models.dtos.OrderItemDto;
import lombok.Data;

import java.util.List;

@Data
public class OrderResponse {
    private Order order;
    private List<OrderItemDto> medias;
    private OrderShipping orderShipping;
}
