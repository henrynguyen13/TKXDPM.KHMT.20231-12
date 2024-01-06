package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.entities.Order;
import com.tkxdpm_be.entities.OrderItem;
import com.tkxdpm_be.entities.OrderShipping;
import com.tkxdpm_be.models.dtos.MediaTO;
import com.tkxdpm_be.models.dtos.OrderDTO;
import com.tkxdpm_be.models.requests.MediaRequest;
import com.tkxdpm_be.models.requests.OrderRequest;
import com.tkxdpm_be.models.responses.OrderResponse;
import com.tkxdpm_be.repositories.MediaRepository;
import com.tkxdpm_be.repositories.OrderItemRepository;
import com.tkxdpm_be.repositories.OrderRepository;
import com.tkxdpm_be.repositories.OrderShippingRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.ApiException;
import utils.ERROR;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderShippingRepository orderShippingRepository;

    @Autowired
    OrderItemRepository orderItemRepository;
    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    MediaRepository mediaRepository;

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
        order.setStatus(1);
        order = this.orderRepository.save(order);
        Double originPrice = 0d, totalPrice, vat;
        List<OrderItem> orderItems = new ArrayList<>();
        for (MediaRequest media : orderRequest.getMedias()) {
            originPrice += media.getPrice();
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(order.getId());
            orderItem.setQuantity(media.getQuantity());
            orderItem.setMediaId(media.getId());
            orderItems.add(orderItem);
            Optional<Media> oMedia = this.mediaRepository.findById(media.getId());
            Media iMedia = oMedia.orElse(new Media());
            iMedia.setQuantityAvailable(iMedia.getQuantityAvailable() - media.getQuantity());
            this.mediaRepository.save(iMedia);
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
        Double shippingFeePrice = 0d;
        Double maxWeight = 0d;
        int quantity = medias.size();
        for (MediaRequest media : medias) {
            totalPrice += media.getPrice();
            if (media.getWeight() > maxWeight) {
                maxWeight = media.getWeight();
            }
        }
        if (totalPrice > 100000) {
            return  0d;

        } else {
            boolean isCenter = city.equals("Hà Nội") || city.equals("TP Hồ Chí Minh");
            double baseFee = isCenter ? 22000d : 30000d;
            double weightFee = (maxWeight < 3) ? baseFee : (baseFee + (maxWeight - 3) / 0.5 * 2500);
            shippingFeePrice += weightFee;
            shippingFeePrice += isRush ? quantity * 10000 : 0;
            return shippingFeePrice;
        }
    }

    public List<OrderResponse> getHistoryOrder(Long userId) {
        List<OrderResponse> responses = new ArrayList<>();
        List<Order> orders = this.orderRepository.findByUserId(userId);
        for (Order order : orders) {
            OrderResponse response = new OrderResponse();
            response.setOrder(order);
            OrderShipping orderShipping = this.orderShippingRepository.findById(order.getOrderShippingId()).get();
            response.setOrderShipping(orderShipping);
            responses.add(response);
        }
        return responses;
    }

    public Long cancelOrder(Long orderId) throws ApiException {
        Optional<Order> oOrder = this.orderRepository.findById(orderId);
        if (oOrder.isEmpty()) {
            throw new ApiException(ERROR.RESOURCE_NOT_FOUND);
        }
        Order order = oOrder.get();
        this.orderItemRepository.deleteByOrderId(orderId);
        this.orderRepository.deleteById(orderId);
        return orderId;
    }
}
