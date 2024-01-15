package com.tkxdpm_be.models.dtos;

import lombok.Data;

@Data
public class RefundResponse {
    private String vnp_ResponseId;
    private String vnp_Command;
    private String vnp_ResponseCode;
    private String vnp_Message;
    private String vnp_TmnCode;
    private String vnp_TxnRef;
    private String vnp_Amount;
}
