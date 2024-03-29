package com.tkxdpm_be.controllers;

import com.tkxdpm_be.services.VnPayService;
import model.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utils.ApiException;

import java.io.IOException;
import java.text.ParseException;
import java.util.Hashtable;
import java.util.Map;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    VnPayService vnPayService;

    @GetMapping("/get-pay-url")
    public BaseResponse<String> generatePayUrl(@RequestParam Integer totalPrice) {
        BaseResponse<String> response = new BaseResponse<>();
        response.setData(this.vnPayService.generatePayUrl(totalPrice));
        return response;
    }

    @PostMapping("/refund/{order-id}")
    public BaseResponse<String> refundPayment(@PathVariable(name = "order-id") Long orderId) throws IOException, ParseException, ApiException {
        BaseResponse<String> response = new BaseResponse<>();
        response.setData(this.vnPayService.refund(orderId));
        return response;
    }

    @PostMapping
    public BaseResponse<Map<String, String>> makePayment(@RequestBody Map<String, String> res) {
        System.out.println(res);
        BaseResponse<Map<String, String>> response = new BaseResponse<>();
        Map<String, String> result = new Hashtable<String, String>();
        try {
            vnPayService.makePaymentTransaction(res);
            result.put("RESULT", "PAYMENT SUCCESSFUL!");
            result.put("MESSAGE", "You have succesffully paid the order!");
        } catch (ApiException e) {
            result.put("MESSAGE", e.getMessage());
            result.put("RESULT", "PAYMENT FAILED!");

        }
        return response;
    }
}
