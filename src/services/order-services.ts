import AXIOS from "@/lib/axios";

export const createOrder = async (data: {
  productId: string;
  fullCoverUrl: string;
  frontCoverUrl: string;
  quantity: number;
}) => {
  const res = await AXIOS.post(`orders`, data);
  return res.data;
};
