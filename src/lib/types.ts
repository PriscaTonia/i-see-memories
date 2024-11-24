export interface Profile {
  _id: string;
  email: string;
  isDeleted: boolean;
  city: string;
  country: string;
  name: string;
  phoneNum: string;
  state: string;
  street: string;
  zipcode: string;
}

export interface CartItem {
  shippingDetails: ShippingDetails;
  _id: string;
  productId: string;
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
  price: number;
  userId: string;
  status: string;
  __v: number;
}

export interface ShippingDetails {
  name: string;
  country: string;
  state: string;
  street: string;
  zipcode: string;
  city: string;
}
