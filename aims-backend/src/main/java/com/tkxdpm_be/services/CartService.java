package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.CartItem;
import com.tkxdpm_be.models.dtos.CartItemDto;
import com.tkxdpm_be.repositories.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    private final CartItemRepository cartItemRepository;

    public CartService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public Long addMediaToCart(Long userId, Long mediaId, Integer quantity) {
        CartItem cartItem = new CartItem();
        cartItem.setUserId(userId);
        cartItem.setMediaId(mediaId);
        cartItem.setQuantity(quantity);
        cartItem = this.cartItemRepository.save(cartItem);
        return cartItem.getCartItemId();
    }

    public List<CartItemDto> getAllMediaInCart(Long userId) {
        return this.cartItemRepository.getAllMediaInCart(userId);
    }
}
