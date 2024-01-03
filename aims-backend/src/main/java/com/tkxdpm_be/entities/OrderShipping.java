package com.tkxdpm_be.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_shippings")
public class OrderShipping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private String city;
    private String address;
    private String shippingInstruction;
    private String shippingMethod;
    private String shipmentDetails;
    private String deliveryInstruction;
    private String deliveryTime;
}
