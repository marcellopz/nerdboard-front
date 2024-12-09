import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
