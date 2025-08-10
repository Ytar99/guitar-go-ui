import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshTokenFx } from "../../features/auth/model/effects";
import { getAccessToken, setTokens, clearTokens } from "../lib/token";
import config from "../config";

const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Queue to avoid multiple refresh calls
let isRefreshing = false;
let failedQueue: { resolve: (value?: any) => void; reject: (err: any) => void; config: AxiosRequestConfig }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else {
      if (token && p.config.headers) p.config.headers.Authorization = `Bearer ${token}`;
      p.resolve(p.config);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config?: AxiosRequestConfig }) => {
    const originalRequest = error.config!;
    if (error.response?.status === 401 && !originalRequest.params._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        }).then((cfg: unknown) => api(cfg as AxiosRequestConfig));
      }

      originalRequest.params._retry = true;
      isRefreshing = true;

      try {
        const tokens = await refreshTokenFx(); // effector effect that returns tokens
        setTokens(tokens);
        processQueue(null, tokens.accessToken);
        return api(originalRequest);
      } catch (e) {
        processQueue(e, null);
        clearTokens();
        // optionally trigger global logout event
        throw e;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
