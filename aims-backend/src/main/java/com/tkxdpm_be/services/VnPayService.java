package com.tkxdpm_be.services;

import com.tkxdpm_be.configs.VnPayConfig;
import com.tkxdpm_be.models.dtos.PaymentTransaction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import utils.ApiException;
import utils.ERROR;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VnPayService {
    private static final String PAY_COMMAND = "pay";
    private static final String VERSION = "2.1.0";

    @Value("${vnpay.redirect.url}")
    String vnPayRedirectUrl;

    public String generatePayUrl(int money) {
        try {
            String vnp_Version = VERSION;
            String vnp_Command = PAY_COMMAND;
            String vnp_OrderInfo = "Thanh toan hoa don";
            String orderType = "other";
            String vnp_TxnRef = VnPayConfig.getRandomNumber(8);
            String vnp_IpAddr = VnPayConfig.getIpAddress();
            String vnp_TmnCode = VnPayConfig.vnp_TmnCode;

            int amount = money * 100;
            Map vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", vnp_Version);
            vnp_Params.put("vnp_Command", vnp_Command);
            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.put("vnp_Amount", String.valueOf(amount));
            vnp_Params.put("vnp_CurrCode", "VND");
            String bank_code = new String();
            if (bank_code != null && !bank_code.isEmpty()) {
                vnp_Params.put("vnp_BankCode", bank_code);
            }
            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
            vnp_Params.put("vnp_OrderType", orderType);

            String locate = new String();
            if (locate != null && !locate.isEmpty()) {
                vnp_Params.put("vnp_Locale", locate);
            } else {
                vnp_Params.put("vnp_Locale", "vn");
            }
            vnp_Params.put("vnp_ReturnUrl", vnPayRedirectUrl);
            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());

            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
            cld.add(Calendar.MINUTE, 15);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            //Add Params of 2.1.0 Version
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
            //Billing
//            vnp_Params.put("vnp_Bill_Mobile", req.getParameter("txt_billing_mobile"));
//            vnp_Params.put("vnp_Bill_Email", req.getParameter("txt_billing_email"));
//            String fullName = (req.getParameter("txt_billing_fullname")).trim();
            String fullName = "Khánh PD";
            if (fullName != null && !fullName.isEmpty()) {
                int idx = fullName.indexOf(' ');
                String firstName = fullName.substring(0, idx);
                String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
                vnp_Params.put("vnp_Bill_FirstName", firstName);
                vnp_Params.put("vnp_Bill_LastName", lastName);

            }
//            vnp_Params.put("vnp_Bill_Address", req.getParameter("txt_inv_addr1"));
//            vnp_Params.put("vnp_Bill_City", req.getParameter("txt_bill_city"));
//            vnp_Params.put("vnp_Bill_Country", req.getParameter("txt_bill_country"));
//            if (req.getParameter("txt_bill_state") != null && !req.getParameter("txt_bill_state").isEmpty()) {
//                vnp_Params.put("vnp_Bill_State", req.getParameter("txt_bill_state"));
//            }
            // Invoice
//            vnp_Params.put("vnp_Inv_Phone", req.getParameter("txt_inv_mobile"));
//            vnp_Params.put("vnp_Inv_Email", req.getParameter("txt_inv_email"));
//            vnp_Params.put("vnp_Inv_Customer", req.getParameter("txt_inv_customer"));
//            vnp_Params.put("vnp_Inv_Address", req.getParameter("txt_inv_addr1"));
//            vnp_Params.put("vnp_Inv_Company", req.getParameter("txt_inv_company"));
//            vnp_Params.put("vnp_Inv_Taxcode", req.getParameter("txt_inv_taxcode"));
//            vnp_Params.put("vnp_Inv_Type", req.getParameter("cbo_inv_type"));
            //Build data to hash and querystring
            List fieldNames = new ArrayList(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            Iterator itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = (String) itr.next();
                String fieldValue = (String) vnp_Params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    //Build hash data
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }
            String queryUrl = query.toString();
            String vnp_SecureHash = VnPayConfig.hmacSHA512(VnPayConfig.secretKey, hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            String paymentUrl = VnPayConfig.vnp_PayUrl + "?" + queryUrl;
            return paymentUrl;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public PaymentTransaction makePaymentTransaction(Map<String, String> response) throws ApiException {
        if (response == null) {
            return null;
        }

        // Create Payment transaction
        String errorCode = response.get("vnp_TransactionStatus");
        String transactionId = response.get("vnp_TransactionNo");
        String transactionContent = response.get("vnp_OrderInfo");
        int amount = Integer.parseInt(response.get("vnp_Amount")) / 100;
        String createdAt = response.get("vnp_PayDate");
        PaymentTransaction trans = new
                PaymentTransaction(errorCode, transactionId, transactionContent, amount, createdAt);

        switch (trans.getErrorCode()) {
            case "00":
                break;
            case "01":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch không hoàn thành");
            case "02":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch không hoàn thành");
            case "04":
                throw new ApiException(ERROR.INVALID_REQUEST, "Hoàn tác giao dịch");
            case "05":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch đang thực hiện");
            case "09":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch bị từ chối");
            case "06":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch chuyển tới ngân hàng");
            case "07":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch ẩn danh");
            default:
                throw new ApiException(ERROR.INVALID_REQUEST, "Lỗi không xác định");
        }

        return trans;
    }
}
