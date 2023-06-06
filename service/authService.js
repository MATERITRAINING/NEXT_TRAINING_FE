import client from "./axios";

const authService = {
  async login(payload) {
    return client.post("/login", payload);
  },

  async permissionById(id) {
    return client.get(`/permission-by-id/${id}/`);
  },
  

  async googleLogin(payload) {
    return client.post("/google-login", payload);
  }
};

export default authService;