import axios from "axios";

export const api = axios.create({
  // baseURL: "http://13.58.33.119:5000",
  baseURL: "http://13.58.33.119:5000",
  // baseURL: "http://10.10.20.11:3000",
});

// Request interceptor: dynamically add token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
