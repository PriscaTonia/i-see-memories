import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { logoutUser } from "./logout";
import { notify } from "./notify";

// Create Axios instance
const AXIOS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor
AXIOS.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    const token = session?.user?.jwt;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["ism-auth-token"] = `${token}`;
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
AXIOS.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error);

    if (error?.status === 401) {
      notify("error", "Unauthorized Access!");

      logoutUser();
    }

    // if (error?.status === 500) {
    //   notify("error", "Internal Server Error!");
    // }

    // Handle response errors
    return Promise.reject(error);
  }
);

export default AXIOS;
