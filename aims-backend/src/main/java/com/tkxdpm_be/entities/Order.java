package com.tkxdpm_be.entities;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Double totalAmount;
    private Long orderShippingId;
    private Double originPrice;
    private Double vat;
    private Double shippingFee;
    private Integer status;
}
