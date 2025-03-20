import axios from "axios";

const api = axios.create({
  baseURL: 'https://localhost:44357/api',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error:", error);
    return Promise.reject(error);
  }
);

export default api;
