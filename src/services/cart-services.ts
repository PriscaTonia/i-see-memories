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
}: {
  body: {
    ids: string[];
    shippingDetails: {
      name: string;
      zipcode: string;
      country: string;
      street: string;
      state: string;
      city: string;
      phoneNum: string;
    };
  };
}) => {
  const res = await AXIOS.patch(`users/cart/shipping`, body);
  return res.data;
};
