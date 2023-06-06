import axios from "axios";
import { parse, stringify } from "qs";

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});


