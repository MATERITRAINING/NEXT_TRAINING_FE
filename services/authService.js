import { axiosClient } from "./axios";

export function login(values) {
  return axiosClient.post("/login", values);
}
