import axios from "axios";

axios.defaults.baseURL = "http://localhost:6699/tkxdpm/api/v1";
export const OrderService = {
  calculateShippingFee: async (request, isRush) => {
    const response = await axios.post("/orders/get-shipping-fee", request, {
      params: { isRush },
    });
    return response;
  },

  createOrder: async (request) => {
    const response = await axios.post("/orders", request);
    return response;
  },

  getOrderById: async (id) => {
    const response = await axios.get(`/orders/detail/${id}`);
    return response;
  },
  orderSuccess: async (id) => {
    await axios.put(`/orders/payment-success/${id}`);
  },
  getHistoryOrder: async () => {
    const response = await axios.get(`/orders/history/1`);
    return response;
  },
  cancelOrder: async (id) => {
    const response = await axios.delete(`/orders/cancel-order/${id}`);
    return response;
  }
};
