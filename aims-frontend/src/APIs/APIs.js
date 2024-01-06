import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:6699/tkxdpm/api/v1/",
  headers: { "content-type": "application/json" },
});

export const api = (method, endpoint, payload) => {
  return axiosClient(endpoint, { method: method, data: payload })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
