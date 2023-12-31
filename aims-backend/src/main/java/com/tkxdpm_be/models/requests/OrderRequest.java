package com.tkxdpm_be.models.requests;

import com.tkxdpm_be.entities.OrderShipping;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private OrderShipping orderShipping;
    private List<MediaRequest> medias;
    private Double shippingFee;
    private Long userId;
}
