"use client";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";
// const BASE_URL = "https://kabirsh.loca.lt/api/v1";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const fetcher = async (url: string) => {
  const token = getAuthToken();

  console.log(token, "token in fetcher");

  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log(response, "response in fetcher");
    return response.data;
    //@ts-ignore
  } catch (e) {}
};

export default fetcher;
