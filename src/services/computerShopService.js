import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
    endpoints: (builder) => ({
        getProducts: builder.query("products"),
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

export const { useGetProductsQuery, useLoginMutation, useRegisterMutation } =
    shopApi;
