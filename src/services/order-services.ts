import ADMIN_AXIOS from "@/lib/admin-axios";
import AXIOS from "@/lib/axios";

export const createCartItem = async (
  items: {
    fullCoverUrl: string;
    frontCoverUrl: string;
    productId: string;
    quantity: number;
    title: string;
    subTitle: string;
    color: string;
    _id?: string;
  }[]
) => {
  const res = await AXIOS.post(`users/cart`, items);
  return res.data;
};

export const fetchAllOrdersList = async () => {
  const res = await ADMIN_AXIOS.get(`orders`);
  return res.data;
};

export const fetchAnOrderDetails = async ({ id }: { id: string }) => {
  const res = await ADMIN_AXIOS.get(`orders/${id}`);
  return res.data;
};

export const updateAnOrder = async ({
  body,
  orderId,
}: {
  orderId: string;
  body: {
    shippingDetails: {
      name?: string;
      zipcode?: string;
      country?: string;
      street?: string;
      state?: string;
      city?: string;
      phoneNum?: string;
    };
    status?: OrderStatusEnum;
  };
}) => {
  const res = await ADMIN_AXIOS.patch(`orders/${orderId}`, body);
  return res.data;
};

export enum OrderStatusEnum {
  Paid = "Paid",
  Processing = "Processing",
  Delivered = "Delivered",
}
