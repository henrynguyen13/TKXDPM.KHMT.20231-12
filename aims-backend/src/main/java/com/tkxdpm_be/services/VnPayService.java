package com.tkxdpm_be.services;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tkxdpm_be.configs.VnPayConfig;
import com.tkxdpm_be.entities.PaymentTransaction;
import com.tkxdpm_be.repositories.PaymentTransactionRepository;
import com.tkxdpm_be.utils.Utils;
import model.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import utils.ApiException;
import utils.ERROR;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VnPayService {
    private static final String PAY_COMMAND = "pay";
    private static final String VERSION = "2.1.0";

    @Value("${vnpay.redirect.url}")
    String vnPayRedirectUrl;

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    RestTemplate restTemplate;

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
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
            String fullName = "Khánh PD";
            if (fullName != null && !fullName.isEmpty()) {
                int idx = fullName.indexOf(' ');
                String firstName = fullName.substring(0, idx);
                String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
                vnp_Params.put("vnp_Bill_FirstName", firstName);
                vnp_Params.put("vnp_Bill_LastName", lastName);

            }
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
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
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

    public String refund(Long orderId) throws IOException, ParseException {
        Optional<PaymentTransaction> oPaymentTransaction = this.paymentTransactionRepository.findByOrderId(orderId);
        PaymentTransaction paymentTransaction = oPaymentTransaction.get();
        long amountVNPay = paymentTransaction.getAmount() * 100L;

        String vnp_TxnRef = paymentTransaction.getTransactionNum();
        String vnp_RequestId = VnPayConfig.getRandomNumber(8);
        String vnp_IpAddr = VnPayConfig.getIpAddress();

        String vnp_TmnCode = VnPayConfig.vnp_TmnCode;
        String orderInfor = "Refund";

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VERSION);
        vnp_Params.put("vnp_Command", "refund");
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amountVNPay));
        vnp_Params.put("vnp_OrderInfo", orderInfor);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_TransactionType", "02");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_CreateBy", "aims");
        vnp_Params.put("vnp_RequestId", vnp_RequestId);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//        String vnp_TransactionDate = Utils.convertDateFormat(paymentTransaction.getCreatedAt());
        vnp_Params.put("vnp_TransactionDate", paymentTransaction.getCreatedAt());
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        String hash_Data= String.join("|", vnp_RequestId, VERSION, "refund", vnp_TmnCode,
                "02", vnp_TxnRef, String.valueOf(amountVNPay), "", paymentTransaction.getCreatedAt(),
                "aims", vnp_CreateDate, vnp_IpAddr, orderInfor);

        String vnp_SecureHash = VnPayConfig.hmacSHA512(VnPayConfig.secretKey, hash_Data.toString());

        vnp_Params.put("vnp_SecureHash", vnp_SecureHash);

        URL url = new URL(VnPayConfig.vnp_ApiUrl);

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
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String refundUrl = VnPayConfig.vnp_ApiUrl + "?" + queryUrl;
        return refundUrl;

//        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//
//        connection.setRequestMethod("POST");
//        connection.setRequestProperty("Content-Type", "application/json");
//        connection.setDoOutput(true);
//        DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
//        Gson gson = new Gson();
//        Type typeObject = new TypeToken<HashMap>() {}.getType();
//        String gsonData = gson.toJson(vnp_Params, typeObject);
//        wr.writeBytes(gsonData);
//        wr.flush();
//        wr.close();
//        int responseCode = connection.getResponseCode();
//        System.out.println("nSending 'POST' request to URL : " + url);
//        System.out.println("Post Data : " + vnp_Params);
//        System.out.println("Response Code : " + responseCode);
//        BufferedReader in = new BufferedReader(
//                new InputStreamReader(connection.getInputStream()));
//        String output;
//        StringBuffer response = new StringBuffer();
//        while ((output = in.readLine()) != null) {
//            response.append(output);
//        }
//        in.close();
//        System.out.println(response.toString());
//        return response.toString();
    }

    public void makePaymentTransaction(Map<String, String> response) throws ApiException {
        if (response == null) {
            return;
        }

        // Create Payment transaction
        Long orderId = Long.valueOf(response.get("order_id"));
        String errorCode = response.get("vnp_TransactionStatus");
        String transactionId = response.get("vnp_TransactionNo");
        String transactionContent = response.get("vnp_OrderInfo");
        String transactionNum = response.get("vnp_TxnRef");
        int amount = Integer.parseInt(response.get("vnp_Amount"));
        String createdAt = response.get("vnp_PayDate");
        PaymentTransaction trans = new
                PaymentTransaction(orderId, errorCode, transactionId, transactionContent, transactionNum, amount, createdAt);
        this.paymentTransactionRepository.save(trans);
        switch (trans.getErrorCode()) {
            case "00":
                break;
            case "01":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch không hoàn thành");
            case "02":
                throw new ApiException(ERROR.INVALID_REQUEST, "Giao dịch thất bại");
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

    }
}
