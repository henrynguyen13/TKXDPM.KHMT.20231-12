package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.*;
import com.tkxdpm_be.models.dtos.InvoiceResponse;
import com.tkxdpm_be.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService implements IInvoiceService{
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderShippingRepository orderShippingRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private MediaRepository mediaRepository;

//    @Override
//    public List<Invoice> getAll() {
//        return invoiceRepository.findAll();
//    }
//
//    @Override
//    public Invoice getById(long id) {
//        return invoiceRepository.findById(id).get();
//    }

    @Override
    public InvoiceResponse invoice(long id) {
        InvoiceResponse response = new InvoiceResponse();
        // Mỗi khi thực hiện hàm -> check sự tồn tại của Id
        Order oder = orderRepository.findById(id).get();
        OrderShipping orderShipping = orderShippingRepository.findById(oder.getOrderShippingId()).get();
        List<OrderItem> orderItemList = orderItemRepository.findAllByOrderId(oder.getId());

        response.setOder(oder);
        response.setOrderItemList(orderItemList);
        response.setOrderShipping(orderShipping);


        return response;
    }
}
