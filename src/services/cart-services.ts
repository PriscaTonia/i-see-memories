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

export const deleteCartItem = async ({ id }: { id: string }) => {
  const res = await AXIOS.delete(`users/cart/${id}`);
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
