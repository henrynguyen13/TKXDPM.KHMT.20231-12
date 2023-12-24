package com.tkxdpm_be.controllers;

import com.tkxdpm_be.models.dtos.CartItemDto;
import com.tkxdpm_be.services.CartService;
import model.BaseResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{user-id}")
    public BaseResponse<Long> addMediaToCart(@PathVariable(name = "user-id") Long userId,
                                             @RequestParam Long mediaId, @RequestParam Integer quantity) {
        BaseResponse<Long> response = new BaseResponse<>();
        response.setData(this.cartService.addMediaToCart(userId, mediaId, quantity));
        return response;
    }

    @GetMapping("/{user-id}")
    public BaseResponse<List<CartItemDto>> getMediaInCart(@PathVariable(name = "user-id") Long userId) {
        BaseResponse<List<CartItemDto>> response = new BaseResponse<>();
        response.setData(this.cartService.getAllMediaInCart(userId));
        return response;
    }
}
