package com.tkxdpm_be.controllers;

import com.tkxdpm_be.models.dtos.CartItemDto;
import com.tkxdpm_be.services.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import model.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utils.ApiException;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/{user-id}")
    public BaseResponse<Long> addMediaToCart(@PathVariable(name = "user-id") Long userId,
                                             @RequestParam Long mediaId, @RequestParam Integer quantity) throws ApiException {
        System.out.println("mediaID" + mediaId);
        System.out.println("userId" + userId);
        BaseResponse<Long> response = new BaseResponse<>();
        response.setData(this.cartService.addMediaToCart(userId, mediaId, quantity));
        return response;
    }

    @GetMapping("/{user-id}")
    public ResponseEntity<List<CartItemDto>> getMediaInCart(@PathVariable(name = "user-id") Long userId) {
        List<CartItemDto> listMediaInCart = cartService.getAllMediaInCart(userId);
        return ResponseEntity.ok().body(listMediaInCart);
    }

    @PutMapping("/quantityItem/{cartItemId}")
    public void changeQuantityCartItem(@PathVariable(name = "cartItemId") Long cartItemId,
                                                    @RequestBody Map<String, String> requestBody) {
        String typeChange = requestBody.get("typeChange");
        cartService.changeQuantityCartItem(cartItemId, typeChange);
    }

    @DeleteMapping("/delete/{cartItemId}")
    public void deleteItemInCart(@PathVariable(name = "cartItemId") Long cartItemId) {
        cartService.deleteItemInCart(cartItemId);
    }

    @DeleteMapping("/deleteAll/{userId}")
    public void deleteAllItemInCart(@PathVariable(name = "userId") Long userId) {
        cartService.deleteAllItemInCart(userId);
    }

    @GetMapping("/numProduct/{user-id}")
    public ResponseEntity<Integer> getNumMediaInCart(@PathVariable(name = "user-id") Long userId) {
        Integer numMediaInCart = cartService.getNumMediaInCart(userId);
        return ResponseEntity.ok().body(numMediaInCart);
    }
    @GetMapping("/totalPrice/{user-id}")
    public ResponseEntity<Double> getTotalPriceInCart(@PathVariable(name = "user-id") Long userId) {
        Double totalPriceInCart = cartService.getTotalPriceInCart(userId);
        return ResponseEntity.ok().body(totalPriceInCart);
    }
}
