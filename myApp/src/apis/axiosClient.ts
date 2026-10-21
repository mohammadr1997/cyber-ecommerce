import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://cyber-ecommerce-backend.vercel.app/api",
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosClient;
