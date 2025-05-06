"use client";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); 
  }
  return null;
};

const fetcher = async (url: string) => {
  const token = getAuthToken();

  console.log(token , "token in fetcher")

  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error: any) {
    // Handle errors and throw with extra information
    console.log(error)
    const err = new Error("Error fetching data");
    err.info = error.response ? error.response.data : null;
    err.status = error.response ? error.response.status : null;
    throw err;
  }
};

export default fetcher;
