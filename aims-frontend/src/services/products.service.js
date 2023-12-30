import axios from "axios";

axios.defaults.baseURL = "http://localhost:6699/tkxdpm/api/v1";
export const ProductService = {
  getAllMedia: async (pageSize, pageNumber) => {
    const response = await axios.get("/medias", {
      params: { pageSize, pageNumber },
    });
    return response;
  },

  getMediaById: async (id) => {
    const response = await axios.get(`/medias/${id}`);
    return response;
  },
};
