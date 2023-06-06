import client from "./axios";

const authService = {
  async login(payload) {
    return client.post("/login", payload);
  },

  async permission(id) {
    return client.get(`/permission/${id}`);
  },

  async googleLogin(payload) {
    return client.post("/google-login", payload);
  }
};

export default authService;