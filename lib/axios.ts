"use client";
import axios from "axios";
import { useMemo } from "react";
import toast from "react-hot-toast";

// Create instance with timeout configurations
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: "https://plenty-pumas-report.loca.lt/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // Connection timeout (time to establish the connection)
  timeout: 5000,
  timeoutErrorMessage: "Connection timed out. Please try again.",
});

// Add custom read timeout for responses
axios.defaults.transitional = {
  ...axios.defaults.transitional,
  // Force response timeout handling
  clarifyTimeoutError: true,
};

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

// Add response interceptor to handle timeout errors more gracefully
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      toast.error("Request timed out");
      return Promise.reject(
        new Error("The request took too long to complete. Please try again.")
      );
    }
    return Promise.reject(error);
  }
);

export const useAxiosInstance = () => {
  return useMemo(() => axiosInstance, []);
};

export default axiosInstance;
