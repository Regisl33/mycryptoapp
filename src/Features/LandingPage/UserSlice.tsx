import {
  fullUserType,
  passwordResetType,
  favoriteMutationType,
  colorMutation,
} from "../../Types/LandingTypes";
import UserApi from "../../Api/UserApi";
import { createEntityAdapter } from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter({
  selectId: (user: fullUserType) => user.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = userAdapter.getInitialState();

export const userSliceApi = UserApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      transformResponse: (res: fullUserType[]) => {
        const userData: fullUserType[] = res;
        return userAdapter.setAll(initialState, userData);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "User" as const, id: id })),
              { type: "User", id: "ALL" },
            ]
          : [{ type: "User", id: "ALL" }],
    }),
    getCurrentUser: builder.query({
      query: (id: number) => `/users/${id}`,
      transformResponse: (res: fullUserType) => {
        let currentUser = res;
        return currentUser;
      },
    }),
    addUser: builder.mutation({
      query: (user: fullUserType) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    passwordReset: builder.mutation({
      query: ({ passwordChange, id }: passwordResetType) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: passwordChange,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    favorite: builder.mutation({
      query: ({ user, id }: favoriteMutationType) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    color: builder.mutation({
      query: ({ user, id }: colorMutation) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useAddUserMutation,
  usePasswordResetMutation,
  useFavoriteMutation,
  useColorMutation,
} = userSliceApi;
