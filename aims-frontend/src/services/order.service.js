import axios from "axios";

axios.defaults.baseURL = "http://localhost:6699/tkxdpm/api/v1";
export const OrderService = {
  calculateShippingFee: async (city, listMedia, isRush) => {
    const response = await axios.post(
      "/orders/get-shipping-fee",
      {
        orderShipping: {
          city: city,
        },
        medias: listMedia,
        shippingFee: null,
        userId: "1",
      },
      {
        params: { isRush },
      }
    );
    return response;
  },
};
