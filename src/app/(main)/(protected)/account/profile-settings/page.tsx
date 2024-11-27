"use client";
import UpdateAddressForm from "@/components/address-settings";
import UpdatePasswordForm from "@/components/password-settings";
import UpdateProfileForm from "@/components/profile-settings";
import { logoutUser } from "@/lib/logout";
import { notify } from "@/lib/notify";
import { fetchProfileInfo, updateProfile } from "@/services/profile-services";
import { userStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStore } from "zustand";

const ProfileSettings = () => {
  const router = useRouter();

  // logout
  const logout = async () => {
    await logoutUser();
    router.push("/auth/sign-in");
  };

  const userId = useStore(userStore, (state) => state.userId);

  const [sec, setSec] = useState("");

  // getting the profile info
  const {
    data: profileInformation,
    refetch,
    // isLoading,
  } = useQuery({
    queryKey: ["fetchProfile", userId],
    queryFn: async () => {
      try {
        const response = await fetchProfileInfo({ id: userId });
        return response?.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  // update shipping address in profile
  const { mutate: update, isPending } = useMutation({
    mutationFn: async ({
      body,
    }: {
      body: {
        name?: string;
        email?: string;
        zipcode?: string;
        country?: string;
        street?: string;
        state?: string;
        city?: string;
        phoneNum?: string;
        password?: string;
      };
    }) => {
      return await updateProfile({ body: body });
    },
    onSuccess: async () => {
      notify("success", "Profile Updated successfully!");
      refetch();

      if (sec === "password") {
        logout();
        setSec("");
        return;
      }

      setSec("");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  return (
    <div className="flex flex-col gap-10 px-6 font-hagrid">
      <h2 className="text-lg lg:text-xl font-bold">Profile Settings</h2>
      <UpdateProfileForm
        profileInformation={profileInformation}
        update={update}
        isPending={isPending}
        setSec={setSec}
        sec={sec}
      />

      <h2 className="text-lg lg:text-xl font-bold">Address Settings</h2>
      <UpdateAddressForm
        profileInformation={profileInformation}
        update={update}
        isPending={isPending}
        setSec={setSec}
        sec={sec}
      />

      <h2 className="text-xl font-bold">Password Settings</h2>
      <UpdatePasswordForm
        update={update}
        isPending={isPending}
        setSec={setSec}
        sec={sec}
      />
    </div>
  );
};

export default ProfileSettings;
