import AXIOS from "@/lib/axios";

export const fetchProfileInfo = async () => {
  const res = await AXIOS.get(`users/profile`);
  return res.data;
};

export const createPayment = async () => {
  const res = await AXIOS.post(`users/place-order`);
  return res.data;
};

export const updateProfile = async ({
  body,
}: {
  body: {
    email?: string;
    name?: string;
    zipcode?: string;
    country?: string;
    street?: string;
    state?: string;
    city?: string;
    phoneNum?: string;
    password?: string;
  };
}) => {
  const res = await AXIOS.patch(`users/profile`, body);
  return res.data;
};
