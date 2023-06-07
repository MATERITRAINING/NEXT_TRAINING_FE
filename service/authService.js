import {axiosClient}  from "./axios";

const authService = {
  async login(payload) {

    console.log
    return axiosClient.post("/login", payload);
  },

  async permissionById(id) {
    return axiosClient.get(`/permission-by-id/${id}/`);
  },
  

  async googleLogin(payload) {
    return axiosClient.post("/google-login", payload);
  }
};

export default authService;