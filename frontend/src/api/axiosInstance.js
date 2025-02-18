import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://uno-counter-bue4.onrender.com/api/v1",
  withCredentials: true, // Enables sending cookies
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token"); // Or get it from state/context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
