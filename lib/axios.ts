"use client";
import axios from "axios";
import { useMemo } from "react";

// Create instance without headers
const axiosInstance = axios.create({
  baseURL: "https://light-terms-stand.loca.lt/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to dynamically set Authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token, "token in axios interceptor");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useAxiosInstance = () => {
  return useMemo(() => axiosInstance, []);
};

export default axiosInstance;
