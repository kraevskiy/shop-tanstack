import { useMutation, useQuery } from "@tanstack/react-query";
import { IUser, IUserLogin } from "@/types/user.interface.ts";
import { LoginInputs } from "@/types/login.schema.ts";
import { SearchProductParams } from "@/types/search-product-params.ts";
import qs from "query-string";
import { IProduct, IProductsList } from "@/types/product.interface.ts";
import { ICategory } from "@/types/category.interface.ts";

export const useUserQuery = (token: string) =>
  useQuery<IUser>({
    queryKey: [token],
    queryFn: async () =>
      fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        const result = await res.json();
        if (!res.ok) {
          throw res;
        }
        return result;
      }),
    retry: false,
  });

export const useLoginMutation = () =>
  useMutation<IUserLogin | { message: string }, Error, LoginInputs>({
    mutationFn: async (data) =>
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          expiresInMins: 60 * 24, // optional, defaults to 60
        }),
      }).then((res) => res.json()),
  });

export const useProductsQuery = (searchParams: SearchProductParams) =>
  useQuery<IProductsList>({
    queryKey: ["Products", searchParams],
    queryFn: async () => {
      const url = qs.stringifyUrl({
        url: "https://dummyjson.com/products",
        query: { ...searchParams, select: "title,price,category,description,thumbnail,sku,availabilityStatus" },
      });
      return await fetch(url).then((res) => res.json());
    },
  });

export const useProductQuery = (productId: string) =>
  useQuery<IProduct>({
    queryKey: ["Product", productId],
    queryFn: async () => fetch(`https://dummyjson.com/products/${productId}`).then((res) => res.json()),
  });

export const useCategoriesListQuery = () =>
  useQuery<ICategory[]>({
    queryKey: ["Categories"],
    queryFn: async () => fetch("https://dummyjson.com/products/categories").then((res) => res.json()),
  });

export const useCategoriesProductsQuery = (categorySlug?: string) =>
  useQuery<IProductsList>({
    queryKey: ["ProductCategory", categorySlug],
    queryFn: async () => fetch(`https://dummyjson.com/products/category/${categorySlug}`).then((res) => res.json()),
  });
