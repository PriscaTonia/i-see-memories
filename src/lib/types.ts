import { OrderStatusEnum } from "@/services/order-services";

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

export interface OrderItem {
  shippingDetails: ShippingDetails;
  paidOn: null;
  _id: string;
  status: OrderStatusEnum;
  userId: string;
  __v: number;
  items: Item[];
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
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
}

export interface ShippingDetails {
  name: string;
  zipcode: string;
  country: string;
  street: string;
  state: string;
  city: string;
  phoneNum: string;
}
