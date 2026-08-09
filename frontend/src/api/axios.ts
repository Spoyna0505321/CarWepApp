import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers:{
        "Content-Type":'application/json',
    },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error("Sunucuya ulaşılamıyor.");
    }

    const originalRequest = error.config;
    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/signin") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      try {
        const response = await api.post("/auth/refresh", { refreshToken });
        localStorage.setItem("token", response.data.token);
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return api(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/auth/login";
      }
    }

    if (error.response?.status === 500) {
      console.error("Sunucu hatası.");
    }

    return Promise.reject(error);
  }
);

export default api;