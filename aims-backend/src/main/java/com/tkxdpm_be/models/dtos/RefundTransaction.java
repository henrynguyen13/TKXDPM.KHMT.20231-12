package com.tkxdpm_be.models.dtos;

import lombok.Data;

@Data
public class RefundTransaction {
    private String id;
    private String message;
    private String errorCode;
    private int amount;
    private String content;

    public RefundTransaction(String id, String message, String errorCode, int amount, String content) {
        this.id = id;
        this.message = message;
        this.errorCode = errorCode;
        this.amount = amount;
        this.content = content;
    }

}
