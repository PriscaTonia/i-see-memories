import axios from "axios";
import { toast } from "react-hot-toast";
import { notify } from "./notify";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

// Create Axios instance
const ADMIN_AXIOS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor
ADMIN_AXIOS.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("admin-token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["ism-admin-token"] = `${token}`;
    }

    config.headers["Content-Type"] =
      config.headers["Content-Type"] ?? "application/json";

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    toast.error("Failed to send the request!");
    return Promise.reject(error);
  }
);

// Response Interceptor
ADMIN_AXIOS.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error);

    if (error?.status === 401) {
      notify("error", "Unauthorized Access!");

      Cookies.remove("admin-token");
      Cookies.remove("admin-id");

      redirect("/admin/login");
    }

    // Handle response errors
    return Promise.reject(error);
  }
);

export default ADMIN_AXIOS;
