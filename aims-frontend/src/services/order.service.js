import axios from "axios";

axios.defaults.baseURL = "http://localhost:6699/tkxdpm/api/v1/orders";
export const OrderService = {
  calculateShippingFee: async (request, isRush) => {
    const response = await axios.post("/get-shipping-fee", request, {
      params: { isRush },
    });
    return response;
  },
};
