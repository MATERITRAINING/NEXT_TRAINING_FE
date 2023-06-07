import axios from "axios";
import { parse, stringify } from "qs";
import { signOut } from "next-auth/react";
// const BASE_URL = "http://localhost:1215";
export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("err", error);
    if (401 === error?.response?.status) {
      signOut();
    } else {
      return Promise.reject(error);
    }
  }
);

export const axiosAuth = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});
// import Image from "next/image";
