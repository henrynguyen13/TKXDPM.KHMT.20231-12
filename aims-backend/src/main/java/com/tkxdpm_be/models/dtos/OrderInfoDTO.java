package com.tkxdpm_be.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class OrderInfoDTO {
    private Long id;
    private List<MediaInOrderDTO> listProduct;
    private String name;
    private String phone;
    private String city;
    private String address;
    private String shippingInstruction;
    private String shippingMethod;
    private String shipmentDetails;
    private String deliveryInstruction;
    private String deliveryTime;
    private Double originPrice;
    private Double vat;
    private Double shippingFee;
    private Double totalAmount;
    private Integer status;
}
