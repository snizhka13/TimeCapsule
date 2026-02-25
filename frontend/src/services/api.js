import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      // retry once if server was sleeping
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;