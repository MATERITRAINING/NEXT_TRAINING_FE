import {axiosClient}  from "../../../service/axios";

const authService = {
  async login(payload) {

   
    return axiosClient.post("/login", payload);
  },

  async permission(token) {
    return axiosClient.get(`/permission`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  },
  

  async googleLogin(payload) {
    return axiosClient.post("/google-login", payload);
  }
};

export default authService;