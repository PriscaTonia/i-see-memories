import Cookies from "js-cookie";
import { notify } from "./notify";

export const logoutUser = async () => {
  try {
    // Optionally, you can call the server to invalidate the session:
    // await AXIOS.post(`/auth/logout`);

    // Remove token from cookies
    Cookies.remove("token");

    // Optionally, redirect user after logout
    notify("info", "You have been logged out.");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
