import { axiosClient } from "./axios";

export function login(values) {
  return axiosClient.post("/login", values);
}

export function getPermission(token) {
  return axiosClient.get("/permission", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
