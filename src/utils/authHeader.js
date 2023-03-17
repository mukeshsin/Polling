import axios from "axios";
export const authHeader = () => {
  axios.interceptors.request.use((config) => {
    config.headers.token = JSON.parse(localStorage.getItem("userToken"));
    return config;
  });
};
