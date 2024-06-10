import { useMutation, useQuery } from "@tanstack/react-query";
import qs from "query-string";

import { IUser, IUserLogin, IUsersList } from "@/types/user.interface.ts";
import { LoginInputs } from "@/types/login.schema.ts";
import { SearchParams, SearchParamsWithQuery } from "@/types/search-params.ts";
import { IProduct, IProductsList } from "@/types/product.interface.ts";
import { ICategory } from "@/types/category.interface.ts";
import { IShopCartList } from "@/types/shop-cart.interface.ts";
import { IPostCommentsList, IPostsList, IPostsListItem, IPostAuthor } from '@/types/post.interface.ts';

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

export const useProductsQuery = (searchParams?: SearchParams) =>
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

export const useUsersQuery = (searchParams?: SearchParamsWithQuery) =>
  useQuery<IUsersList>({
    queryKey: ["ProductCategory", searchParams],
    queryFn: async () => {
      const url = qs.stringifyUrl({
        url: "https://dummyjson.com/users/search",
        query: { ...searchParams, select: "email,username,firstName,lastName,image,phone,role,birthDate" },
      });
      return await fetch(url).then((res) => res.json());
    },
  });

export const useUserIdQuery = (userId: string) =>
  useQuery<IUser>({
    queryKey: ["User", userId],
    queryFn: async () => fetch(`https://dummyjson.com/users/${userId}`).then((res) => res.json()),
  });

export const useUserCartsQuery = (userId: string) =>
  useQuery<IShopCartList>({
    queryKey: ["Cards", userId],
    queryFn: async () => fetch(`https://dummyjson.com/carts/user/${userId}`).then((res) => res.json()),
  });

export const usePostsQuery = (searchParams?: SearchParamsWithQuery) =>
  useQuery<IPostsList>({
    queryKey: ["Posts", searchParams],
    queryFn: async () => {
      const url = qs.stringifyUrl({
        url: "https://dummyjson.com/posts/search",
        query: { ...searchParams },
      });
      return await fetch(url).then((res) => res.json());
    },
  });

export const usePostIdQuery = (postId: string) =>
  useQuery<IPostsListItem>({
    queryKey: ["Post", postId],
    queryFn: async () => fetch(`https://dummyjson.com/posts/${postId}`).then((res) => res.json()),
  });

export const usePostIdCommentsMutation = () =>
  useMutation<IPostCommentsList, Error, string>({
    mutationKey: ['PostComments'],
    mutationFn: async (postId) => fetch(`https://dummyjson.com/posts/${postId}/comments`).then((res) => res.json()),
  });

export const usePostIdUserMutation = () =>
  useMutation<IPostAuthor, Error, string>({
    mutationKey: ['PostAuthor'],
    mutationFn: async (userId) =>
      fetch(`https://dummyjson.com/users/${userId}?select=username,firstName,lastName,image`).then((res) => res.json()),
  });
