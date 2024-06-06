import { IBaseListResponse } from "@/types/base.interfaces.ts";

export interface IShopCartItem {
  id: number;
  products: IProductInShopCart[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface IProductInShopCart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface IShopCartList extends IBaseListResponse {
  carts: IShopCartItem[];
}
