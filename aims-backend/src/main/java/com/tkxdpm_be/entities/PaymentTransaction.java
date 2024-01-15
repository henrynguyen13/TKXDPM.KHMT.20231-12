package com.tkxdpm_be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "payment_transactions")
@NoArgsConstructor
@AllArgsConstructor
public class PaymentTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private String errorCode;
    private String transactionId;
    private String transactionNum;
    private String transactionContent;
    private Integer amount;
    private String createdAt;

    public PaymentTransaction(Long orderId, String errorCode, String transactionId, String transactionContent, String transactionNum, int amount, String createdAt) {
        this.orderId = orderId;
        this.errorCode = errorCode;
        this.transactionId = transactionId;
        this.transactionContent = transactionContent;
        this.transactionNum = transactionNum;
        this.amount = amount;
        this.createdAt = createdAt;
    }
}
