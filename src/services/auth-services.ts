import axios, { AxiosResponse } from "axios";

export interface LoginRes {
  message: string;
  success: boolean;
  data: Data;
}

export interface Data {
  user: User;
  jwt: string;
}

export interface User {
  _id: string;
  email: string;
  isDeleted: boolean;
}

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/signup`,
    data
  );
  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<LoginRes>> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      data
    );

    return res;
  } catch (error) {
    return error;
  }
};
