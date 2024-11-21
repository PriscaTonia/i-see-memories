import AXIOS from "@/lib/axios";

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await AXIOS.post(`auth/signup`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await AXIOS.post(`auth/login`, data);
  return response.data;
};
