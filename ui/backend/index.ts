import axios from "axios";

const BASE_URL = "http://192.168.71.247:3000/";

export const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
