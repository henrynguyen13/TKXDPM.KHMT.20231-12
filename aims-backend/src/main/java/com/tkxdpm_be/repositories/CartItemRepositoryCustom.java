package com.tkxdpm_be.repositories;

import com.tkxdpm_be.models.dtos.OrderItemDto;

import java.util.List;

public interface CartItemRepositoryCustom {
    List<OrderItemDto> getAllMediaInCart(Long userId);
}
