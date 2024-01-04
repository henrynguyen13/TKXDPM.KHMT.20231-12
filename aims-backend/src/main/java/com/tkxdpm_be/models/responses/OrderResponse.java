package com.tkxdpm_be.models.responses;

import com.tkxdpm_be.entities.Order;
import com.tkxdpm_be.entities.OrderShipping;
import lombok.Data;

@Data
public class OrderResponse {
    private Order order;
    private OrderShipping orderShipping;
}
