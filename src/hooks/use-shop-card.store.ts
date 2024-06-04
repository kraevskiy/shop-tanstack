import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ELocalStorage } from "@/types/local-storage-enum.ts";

export type ShopCardProduct = {
  id: number;
  thumbnail: string;
  title: string;
  quantity: number;
  price: number;
};

export type ShopCardData = {
  products: ShopCardProduct[];
  totalPrice: number;
};

export type ShopCardActions = {
  addProduct: (product: ShopCardProduct) => void;
  removeProduct: (productId: number) => void;
};

export const useShopCard = create<ShopCardData & ShopCardActions>()(
  immer(
    persist(
      (set) => ({
        products: [],
        totalPrice: 0,
        addProduct: (product) =>
          set((state) => {
            const idx = state.products.findIndex((p) => p.id === product.id);
            if (idx === -1) {
              state.products = [...state.products, product];
            } else {
              state.products[idx].quantity++;
            }
            state.totalPrice = state.products.reduce(
              (previousValue, currentValue) => previousValue + currentValue.price * currentValue.quantity,
              0,
            );
          }),
        removeProduct: (productId) =>
          set((state) => {
            const idx = state.products.findIndex((p) => p.id === productId);
            if (state.products[idx].quantity === 1) {
              state.products = state.products.filter((pr) => pr.id !== productId);
            } else {
              state.products[idx].quantity--;
            }
            state.totalPrice = state.products.reduce(
              (previousValue, currentValue) => previousValue + currentValue.price * currentValue.quantity,
              0,
            );
          }),
      }),
      {
        name: ELocalStorage.shopCard,
      },
    ),
  ),
);
