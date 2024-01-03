package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.entities.Order;
import com.tkxdpm_be.entities.OrderItem;
import com.tkxdpm_be.entities.OrderShipping;
import com.tkxdpm_be.models.requests.MediaRequest;
import com.tkxdpm_be.models.requests.OrderRequest;
import com.tkxdpm_be.repositories.OrderItemRepository;
import com.tkxdpm_be.repositories.OrderRepository;
import com.tkxdpm_be.repositories.OrderShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.ApiException;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderShippingRepository orderShippingRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Transactional(rollbackFor = Exception.class)
    public String createOrder(OrderRequest orderRequest) {
        OrderShipping orderShipping = orderRequest.getOrderShipping();
        orderShipping = this.orderShippingRepository.save(orderShipping);
        Order order = new Order();
        order.setOrderShippingId(orderShipping.getId());
        order.setUserId(orderRequest.getUserId());
        order.setShippingFee(orderRequest.getShippingFee());
        order.setTotalAmount(0.00);
        order.setVat(0.00);
        order = this.orderRepository.save(order);
        Double originPrice = 0d, totalPrice = 0d, vat = 0d;
        List<OrderItem> orderItems = new ArrayList<>();
        for (MediaRequest media : orderRequest.getMedias()) {
            originPrice += media.getPrice();
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(order.getId());
            orderItem.setQuantity(media.getQuantity());
            orderItem.setMediaId(media.getId());
            orderItems.add(orderItem);
        }
        this.orderItemRepository.saveAll(orderItems);
        vat = originPrice * 0.1d;
        totalPrice = originPrice + vat + orderRequest.getShippingFee();
        order.setOriginPrice(originPrice);
        order.setVat(vat);
        order.setTotalAmount(totalPrice);
        this.orderRepository.save(order);
        return "Success";
    }

    public Double getShippingFee(List<MediaRequest> medias, String city, boolean isRush) {
        Double totalPrice = 0d;
        Double maxWeight = 0d;
        int quantity = medias.size();
        for (MediaRequest media : medias) {
            totalPrice += media.getPrice();
            if (media.getWeight() > maxWeight) {
                maxWeight = media.getWeight();
            }
        }
        if (totalPrice > 100000) {
            return totalPrice;
        } else {
            boolean isCenter = city.equals("Hà Nội") || city.equals("TP Hồ Chí Minh");
            double baseFee = isCenter ? 22000d : 30000d;
            double weightFee = (maxWeight < 3) ? baseFee : (baseFee + (maxWeight - 3) / 0.5 * 2500);
            totalPrice += weightFee;
            totalPrice += isRush ? quantity * 10000 : 0;
            return totalPrice;
        }
    }
}
