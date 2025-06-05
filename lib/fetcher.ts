"use client";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";
// const BASE_URL = "https://plenty-pumas-report.loca.lt/api/v1";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const fetcher = async (url: string) => {
  const token = getAuthToken();

  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default fetcher;
