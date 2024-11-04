import UpdatePasswordForm from "@/components/password-settings";
import UpdateProfileForm from "@/components/profile-settings";
import React from "react";

const ProfileSettings = () => {
  return (
    <div className="flex flex-col gap-10 px-6 font-hagrid">
      <h2 className="text-xl font-bold">Profile Settings</h2>
      <UpdateProfileForm />

      <h2 className="text-xl font-bold">Password Settings</h2>
      <UpdatePasswordForm />
    </div>
  );
};

export default ProfileSettings;
