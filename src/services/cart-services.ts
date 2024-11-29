import AXIOS from "@/lib/axios";

export const fetchCartList = async () => {
  const res = await AXIOS.get(`users/cart`);
  return res.data;
};

export const updateCartItemQuantity = async ({
  id,
  body,
}: {
  id: string;
  body: {
    quantity: number;
  };
}) => {
  const res = await AXIOS.patch(`users/cart/${id}`, body);
  return res.data;
};

export const updateCartItemsShipping = async ({
  body,
  orderId,
}: {
  orderId: string;
  body: {
    name: string;
    zipcode: string;
    country: string;
    street: string;
    state: string;
    city: string;
    phoneNum: string;
  };
}) => {
  const res = await AXIOS.patch(
    `users/order-shipping-details/${orderId}`,
    body
  );
  return res.data;
};

// fetch orders
export const fetchOrdersList = async () => {
  const res = await AXIOS.get(`users/orders`);
  return res.data;
};

export const fetchAnOrder = async ({ id }: { id: string }) => {
  const res = await AXIOS.get(`users/orders/${id}`);
  return res.data;
};
