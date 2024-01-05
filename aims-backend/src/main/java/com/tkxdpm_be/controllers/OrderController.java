package com.tkxdpm_be.controllers;

import com.tkxdpm_be.models.dtos.OrderDTO;
import com.tkxdpm_be.models.requests.OrderRequest;
import com.tkxdpm_be.services.OrderService;
import com.tkxdpm_be.services.VnPayService;
import model.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    VnPayService vnPayService;

    @Autowired
    OrderService orderService;

    @GetMapping("/{order-id}/payment")
    public BaseResponse<String> generatePayUrl(@PathVariable(name = "order-id") Long orderId) {
        BaseResponse<String> response = new BaseResponse<>();
        return response;
    }

    @PostMapping
    public BaseResponse<String> createOrder(@RequestBody OrderRequest request) {
        BaseResponse<String> response = new BaseResponse<>();
        response.setData(this.orderService.createOrder(request));
        return response;
    }

    @PostMapping("/get-shipping-fee")
    public BaseResponse<Double> getShippingFee(@RequestBody OrderRequest request,
                                               @RequestParam boolean isRush) {
        BaseResponse<Double> response = new BaseResponse<>();
        response.setData(this.orderService.getShippingFee(request.getMedias(), request.getOrderShipping().getCity(), isRush));
        return response;
    }

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }
}
