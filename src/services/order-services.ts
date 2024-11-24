import AXIOS from "@/lib/axios";

export const createCartItem = async (
  items: {
    fullCoverUrl: string;
    frontCoverUrl: string;
    productId: string;
    quantity: number;
  }[]
) => {
  const res = await AXIOS.post(`users/cart`, items);
  return res.data;
};
