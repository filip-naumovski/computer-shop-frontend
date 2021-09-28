import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getUserCart: builder.query({
      query: () => "carts",
    }),
    getOrders: builder.query({
      query: () => "orders",
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `products/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { ...product },
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { ...product, price: parseInt(product.price) },
      }),
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        url: "carts",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { ...product, price: parseInt(product.price) },
      }),
    }),
    submitOrder: builder.mutation({
      query: () => ({
        url: "orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    confirmOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "authenticate/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "authenticate/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetUserCartQuery,
  useGetOrdersQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddProductMutation,
  useAddProductToCartMutation,
  useSubmitOrderMutation,
  useConfirmOrderMutation,
  useLoginMutation,
  useRegisterMutation,
} = shopApi;
