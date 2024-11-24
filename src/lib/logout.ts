import { notify } from "./notify";
import { signOut } from "next-auth/react";

export const logoutUser = async () => {
  // Optionally, you can call the server to invalidate the session:
  // await AXIOS.post(`/auth/logout`);

  await signOut({
    redirect: true,
    callbackUrl: "/auth/sign-in",
  });

  // Optionally, redirect user after logout
  notify("info", "You have been logged out.");
};
