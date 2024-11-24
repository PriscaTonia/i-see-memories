import axios from "axios";

export const fetchProductList = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}products`);
  return res.data;
};

export const fetchTemplateList = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}templates`);
  return res.data;
};
