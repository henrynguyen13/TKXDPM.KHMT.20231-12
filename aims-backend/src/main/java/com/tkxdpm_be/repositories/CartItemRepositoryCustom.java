package com.tkxdpm_be.repositories;

import com.tkxdpm_be.models.dtos.CartItemDto;

import java.util.List;

public interface CartItemRepositoryCustom {
    List<CartItemDto> getAllMediaInCart(Long userId);
}
