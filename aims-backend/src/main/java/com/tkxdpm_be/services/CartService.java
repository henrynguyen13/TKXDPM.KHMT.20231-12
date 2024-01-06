package com.tkxdpm_be.services;

import com.google.common.util.concurrent.AtomicDouble;
import com.tkxdpm_be.entities.CartItem;
import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.models.dtos.CartItemDto;
import com.tkxdpm_be.repositories.CartItemRepository;
import com.tkxdpm_be.repositories.MediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.ApiException;
import utils.ERROR;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final MediaRepository mediaRepository;

    public Long addMediaToCart(Long userId, Long mediaId, Integer quantity) throws ApiException {
        // Check availabel quantity
        Optional<Media> oMedia = this.mediaRepository.findById(mediaId);
        Media media = oMedia.orElse(new Media(0));
        if (quantity > media.getQuantityAvailable()) {
            throw new ApiException(ERROR.INVALID_REQUEST, "Sản phẩm trong hệ thống không đủ");
        }
        // Check media exist in cart
        Optional<CartItem> oCartItem = this.cartItemRepository.findByUserIdAndAndMediaId(userId, mediaId);
        CartItem cartItem;
        if (oCartItem.isPresent()) {
            cartItem = oCartItem.get();
            cartItem.setQuantity(oCartItem.get().getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setUserId(userId);
            cartItem.setMediaId(mediaId);
            cartItem.setQuantity(quantity);
        }
        cartItem = this.cartItemRepository.save(cartItem);
        return cartItem.getCartItemId();
    }

    public List<CartItemDto> getAllMediaInCart(Long userId) {
        List<CartItemDto> responseListCartMedia = new ArrayList<>();
        List<CartItem> listCartMedia = cartItemRepository.findByUserId(userId);

        listCartMedia.forEach(item -> {
            Optional<Media> mediaInfoOptional = mediaRepository.findById(item.getMediaId());
            mediaInfoOptional.ifPresent(mediaInfo -> {
                CartItemDto cartItemDto = new CartItemDto();
                cartItemDto.setCartItemId(item.getCartItemId());
                cartItemDto.setMediaId(item.getMediaId());
                cartItemDto.setTitle(mediaInfo.getTitle());
                cartItemDto.setImageUrl(mediaInfo.getImageUrl());
                cartItemDto.setPrice(mediaInfo.getPrice());
                cartItemDto.setQuantityAvailable(mediaInfo.getQuantityAvailable());
                cartItemDto.setQuantity(item.getQuantity());
                cartItemDto.setWeight(mediaInfo.getWeight());
                cartItemDto.setIsRush(mediaInfo.getIsRush());
                responseListCartMedia.add(cartItemDto);
            });
        });
        return responseListCartMedia;
    }
    public void changeQuantityCartItem(Long cartItemId, String typeChange) {
        Optional<CartItem> cartItemChangeQuantityOptional = cartItemRepository.findById(cartItemId);
        cartItemChangeQuantityOptional.ifPresent(cartItemChangeQuantity -> {
            Integer currentQuantity = cartItemChangeQuantity.getQuantity();
            if (Objects.equals(typeChange, "add")) {
                cartItemChangeQuantity.setQuantity(currentQuantity + 1);
            } else if (Objects.equals(typeChange, "subtract")) {
                cartItemChangeQuantity.setQuantity(currentQuantity - 1);
            }
            cartItemRepository.save(cartItemChangeQuantity);
        });
    }

    public void deleteItemInCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
    @Transactional
    public void deleteAllItemInCart(Long userId) { cartItemRepository.deleteByUserId(userId); }

    public Integer getNumMediaInCart(Long userId) {
        List<CartItem> listCartMedia = cartItemRepository.findByUserId(userId);
        AtomicInteger numProduct = new AtomicInteger(0);
        listCartMedia.forEach(item -> {
             numProduct.addAndGet(item.getQuantity());
        });
        return numProduct.get();
    }

    public Double getTotalPriceInCart(Long userId) {
        List<CartItem> listCartMedia = cartItemRepository.findByUserId(userId);
        AtomicDouble totalPriceInCart = new AtomicDouble(0);
        listCartMedia.forEach(cartItem -> {
            Media media = mediaRepository.findById(cartItem.getMediaId()).orElseThrow();
            totalPriceInCart.addAndGet(media.getPrice() * cartItem.getQuantity());
        });
        return totalPriceInCart.get();
    }
}
