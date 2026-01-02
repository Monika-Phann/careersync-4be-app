import axios from "axios";
import { getAuthToken, clearAuth } from "../utils/auth";

// 1. Create axios instance with HARDCODED Production URL
const axiosInstance = axios.create({
  baseURL: "https://api-4be.ptascloud.online/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request interceptor - add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Remove Content-Type header for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response interceptor - handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      // Redirect to User Login if session expires
      window.location.href = "https://ptascloud.online/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
