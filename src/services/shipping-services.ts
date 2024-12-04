import ADMIN_AXIOS from "@/lib/admin-axios";
import { ShippingOption } from "@/lib/types";
import axios from "axios";

export const fetchShippingPrices = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}shipping`);
  return res.data;
};

export const updateShippingPrices = async (data: ShippingOption[]) => {
  const res = await ADMIN_AXIOS.put(`shipping`, data);
  return res.data;
};
