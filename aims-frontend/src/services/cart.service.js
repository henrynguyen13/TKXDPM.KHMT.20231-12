import axios from "axios";

axios.defaults.baseURL = "http://localhost:6699/tkxdpm/api/v1";
export const CartService = {
    getAllMediaInCart: async () => {
        const response = await axios.get("/carts/1");
        return response;
    },
    getNumMediaInCart: async () => {
        const response = await axios.get("/carts/numProduct/1");
        return response;
    },
    changeQuantityItemInCart: async (cartItemId, typeChange) => {
        await axios.put(`/carts/quantityItem/${cartItemId}`, { typeChange: typeChange });
    },
    deleteItemInCart: async (cartItemId) => {
        await axios.delete(`/carts/delete/${cartItemId}`);
    },
    deleteCart: async () => {
        await axios.delete('/carts/deleteAll/1')
    }
};