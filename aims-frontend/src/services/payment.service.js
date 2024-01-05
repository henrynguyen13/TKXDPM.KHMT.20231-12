import axios from "axios";

axios.defaults.baseURL = "http://localhost:6699/tkxdpm/api/v1";
export const PaymentService = {
    getPayUrl: async (totalPrice) => {
        const response = await axios.get("/payments/get-pay-url", {
            params: { totalPrice },
        });
        return response;
    },
};