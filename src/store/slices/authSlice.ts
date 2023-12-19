import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice";
import { APIActionResponse, Auth } from "@/types";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation<
      APIActionResponse<any>,
      {
        name: string;
        email: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        data,
      }),
    }),
    userExist: builder.mutation<APIActionResponse<Auth>, { email: string }>({
      query: (data) => ({
        url: "auth/exists",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useUserExistMutation } = extendedApiSlice;
