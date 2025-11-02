
import axios from "axios";


// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://shope-ease-server.vercel.app/api",
  withCredentials: true, // To send cookies automatically
  headers: {
    'Content-Type': 'application/json', // Default type, will be overridden if FormData
  },
  timeout: 10000, // Optional: 10 seconds timeout
});


axiosInstance.interceptors.request.use((config) => {
  // Detect if the payload is FormData
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  // Optionally add Authorization token
  // const token = localStorage.getItem("token");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
}, (error) => {
  return Promise.reject(error);
});

/* // Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired! Please login again.");
      console.warn("⚠️ Unauthorized request");
    } else if (error.response?.status === 403) {
      toast.error("Access denied!");
    } else if (error.response?.status === 500) {
      toast.error("Internal Server Error!");
    } else if (!error.response) {
      toast.error("Network error! Please check your connection.");
    }
    return Promise.reject(error);
  }
); */

export default axiosInstance;
