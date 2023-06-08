import {axiosClient}  from "../../../service/axios";

const authService = {
  async login(payload) {

    console.log
    return axiosClient.post("/login", payload);
  },

  async permission(id) {
    return axiosClient.get(`/permission/${id}/`);
  },
  

  async googleLogin(payload) {
    return axiosClient.post("/google-login", payload);
  }
};

export default authService;