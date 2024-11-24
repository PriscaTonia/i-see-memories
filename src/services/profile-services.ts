import AXIOS from "@/lib/axios";

export const fetchProfileInfo = async ({ id }: { id: string }) => {
  const res = await AXIOS.get(`users/profile/${id}`);
  return res.data;
};

export const updateProfile = async ({
  body,
}: {
  body: {
    name: string;
    zipcode: string;
    country: string;
    street: string;
    state: string;
    city: string;
    phoneNum: string;
  };
}) => {
  const res = await AXIOS.patch(`users/profile`, body);
  return res.data;
};
