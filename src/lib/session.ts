import { userStore } from "@/store";
import { getSession } from "next-auth/react";

export const getUser = async () => {
  const session = await getSession();

  // Directly update Zustand store state
  if (session) {
    userStore.setState({ userId: session?.user?._id });
  }

  // console.log(session);
  // console.log(userStore.getState().userId);
};
