import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your backend API
});

// Attach access token before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired tokens automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized (401) and we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem(REFRESH_TOKEN);

        // If no refresh token → logout
        if (!refresh) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Request new access token
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/token/refresh/`,
          { refresh }
        );

        // Save new token
        localStorage.setItem(ACCESS_TOKEN, res.data.access);

        // Update original request header
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired:", refreshError);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login"; // force login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
