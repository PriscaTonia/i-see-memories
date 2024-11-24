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

export interface CartList {
  shippingDetails: ShippingDetails;
  _id: string;
  userId: string;
  status: string;
  __v: number;
  items: Item[];
  paymentStatus: null;
}

export interface Item {
  productId: ProductID;
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
  _id: string;
}

export interface ProductID {
  _id: string;
  pageCount: string;
  price: number;
  isDeleted: boolean;
  __v: number;
}

export interface ShippingDetails {
  city: string;
  country: string;
  name: string;
  phoneNum: string;
  state: string;
  street: string;
  zipcode: string;
}
