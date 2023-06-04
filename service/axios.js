import axios from "axios";
import { parse, stringify } from "qs";
import { signOut } from "next-auth/react";
// const BASE_URL = "http://localhost:1215";
const client = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    console.log('err', error)
    if (401 === error?.response?.status) {
      signOut();
      
    } else {
      return Promise.reject(error);
    }
  }
);


export default client;



export const axiosAuth = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});
// import Image from "next/image";
