export const config = {
  API_URL: import.meta.env.VITE_API_URL || "",
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  NODE_ENV: import.meta.env.MODE || "development",
};

export default config;
