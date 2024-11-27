import ADMIN_AXIOS from "@/lib/admin-axios";
import axios from "axios";

export const fetchProductList = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}products`);
  return res.data;
};

export const fetchTemplateList = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}templates`);
  return res.data;
};

export const createProduct = async (data: {
  pageCount: string;
  price: number;
}) => {
  const res = await ADMIN_AXIOS.post(`products`, data);
  return res.data;
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: { pageCount: string; price: number };
}) => {
  const res = await ADMIN_AXIOS.put(`products/${id}`, data);
  return res.data;
};

export const deleteProduct = async ({ id }: { id: string }) => {
  const res = await ADMIN_AXIOS.delete(`products/${id}`);
  return res.data;
};
