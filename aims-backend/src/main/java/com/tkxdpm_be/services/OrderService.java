package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.entities.Order;
import com.tkxdpm_be.entities.OrderItem;
import com.tkxdpm_be.entities.OrderShipping;

import com.tkxdpm_be.models.dtos.MediaInOrderDTO;
import com.tkxdpm_be.models.dtos.OrderInfoDTO;
import com.tkxdpm_be.models.dtos.OrderItemDto;
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


    public OrderResponse getDetail(Long orderId) {
        OrderResponse response = new OrderResponse();
        Order order = this.orderRepository.findById(orderId).orElse(new Order());
        OrderShipping orderShipping = this.orderShippingRepository.findById(order.getOrderShippingId()).orElse(new OrderShipping());
        response.setOrder(order);
        response.setOrderShipping(orderShipping);
        return response;
    }

    @Transactional(rollbackFor = Exception.class)
    public Long createOrder(OrderRequest orderRequest) {
        OrderShipping orderShipping = orderRequest.getOrderShipping();
        orderShipping = this.orderShippingRepository.save(orderShipping);
        Order order = new Order();
        order.setOrderShippingId(orderShipping.getId());
        order.setUserId(orderRequest.getUserId());
        order.setShippingFee(orderRequest.getShippingFee());
        order.setTotalAmount(0.00);
        order.setVat(0.00);
        order.setStatus(0);
        order = this.orderRepository.save(order);
        Double originPrice = 0d, totalPrice, vat;
        List<OrderItem> orderItems = new ArrayList<>();
        for (MediaRequest media : orderRequest.getMedias()) {
            originPrice += media.getPrice() * media.getQuantity();
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
        order = this.orderRepository.save(order);
        return order.getId();
    }

    public Double getShippingFee(List<MediaRequest> medias, String city, boolean isRush) {
        System.out.println(medias);
        Double totalPrice = 0d;
        double shippingFeePrice = 0d;
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

    public Long cancelOrder(Long orderId) throws ApiException {
        Optional<Order> oOrder = this.orderRepository.findById(orderId);
        if (oOrder.isEmpty()) {
            throw new ApiException(ERROR.RESOURCE_NOT_FOUND);
        }
        this.orderItemRepository.deleteByOrderId(orderId);
        this.orderRepository.deleteById(orderId);
        return orderId;
    }
    public void paymentSuccess(Long orderId) throws ApiException {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setStatus(1); // Status = 1 đại diện cho đơn hàng đã được thanh toán
        orderRepository.save(order);
        List<OrderItem> orderItemList = orderItemRepository.findByOrderId(orderId);
        orderItemList.forEach(item -> {
            Media media = mediaRepository.findById(item.getMediaId()).orElseThrow();
            int quantityAvailableRemain = media.getQuantityAvailable() - item.getQuantity();
            media.setQuantityAvailable(Math.max(quantityAvailableRemain, 0));
            mediaRepository.save(media);
        });
    }
    public List<OrderInfoDTO> getHistoryOrder(Long userId) {
        List<OrderInfoDTO> listOrderResponse = new ArrayList<>();
        List<Order> listOrder = orderRepository.findByUserIdAndStatus(userId, 1);
        listOrder.forEach(order -> {
            OrderInfoDTO orderInfoDTO = new OrderInfoDTO();
            orderInfoDTO.setId(order.getId());
            List<OrderItem> orderItemList = orderItemRepository.findByOrderId(order.getId());
            List<MediaInOrderDTO> listMediaInOrder = new ArrayList<>();
            orderItemList.forEach(orderItem -> {
                Media media = mediaRepository.findById(orderItem.getMediaId()).orElseThrow();
                MediaInOrderDTO mediaInOrderDTO = new MediaInOrderDTO();
                mediaInOrderDTO.setId(media.getId());
                mediaInOrderDTO.setMainImg(media.getImageUrl());
                mediaInOrderDTO.setTitle(media.getTitle());
                mediaInOrderDTO.setQuantity(orderItem.getQuantity());
                mediaInOrderDTO.setPrice(media.getPrice());
                listMediaInOrder.add(mediaInOrderDTO);
            });
            orderInfoDTO.setListProduct(listMediaInOrder);
            OrderShipping orderShipping = orderShippingRepository.findById(order.getOrderShippingId()).orElseThrow();
            orderInfoDTO.setName(orderShipping.getName());
            orderInfoDTO.setPhone(orderShipping.getPhone());
            orderInfoDTO.setCity(orderShipping.getCity());
            orderInfoDTO.setAddress(orderShipping.getAddress());
            orderInfoDTO.setShippingInstruction(orderShipping.getShippingInstruction());
            orderInfoDTO.setShippingMethod(orderShipping.getShippingMethod());
            orderInfoDTO.setShipmentDetails(orderShipping.getShipmentDetails());
            orderInfoDTO.setDeliveryInstruction(orderShipping.getDeliveryInstruction());
            orderInfoDTO.setDeliveryTime(orderShipping.getDeliveryTime());
            orderInfoDTO.setOriginPrice(order.getOriginPrice());
            orderInfoDTO.setVat(order.getVat());
            orderInfoDTO.setShippingFee(order.getShippingFee());
            orderInfoDTO.setTotalAmount(order.getTotalAmount());
            listOrderResponse.add(orderInfoDTO);
        });
        return listOrderResponse;
    }
}
