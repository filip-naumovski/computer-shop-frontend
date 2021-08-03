import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: async (headers, { getState }) => {
      //const token = getState().auth.token; // doesn't work, gets called before state is loaded from localStorage
      const token = localStorage.getItem("userToken");
      if (token) headers.set("authorization", `Bearer ${token}`);
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
  useDeleteProductMutation,
  useUpdateProductMutation,
  useLoginMutation,
  useRegisterMutation,
} = shopApi;
