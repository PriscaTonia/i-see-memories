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

export const createTemplate = async (data: {
  name: string;
  frontCover: string;
  fullCover: string;
}) => {
  const res = await ADMIN_AXIOS.post(`templates`, data);
  return res.data;
};

export const updateTemplate = async ({
  id,
  data,
}: {
  id: string;
  data: { name: string; frontCover: string; fullCover: string };
}) => {
  const res = await ADMIN_AXIOS.put(`templates/${id}`, data);
  return res.data;
};

export const deleteTemplate = async ({ id }: { id: string }) => {
  const res = await ADMIN_AXIOS.delete(`templates/${id}`);
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
