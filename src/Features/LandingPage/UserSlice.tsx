//Import Dependecies
import { createEntityAdapter } from "@reduxjs/toolkit";
//Import our User Api
import UserApi from "../../Api/UserApi";
//Import Custom Types
import {
  fullUserType,
  passwordResetType,
  favoriteMutationType,
  colorMutation,
} from "../../Types/LandingTypes";

//Define our User Adapter to Normalize our User Data, it takes the user Data from the Api and sorts it by ID
const userAdapter = createEntityAdapter({
  selectId: (user: fullUserType) => user.id,
  sortComparer: (a, b) => a.id - b.id,
});
//Initialise the state
const initialState = userAdapter.getInitialState();
//Create the User Api Endpoints
export const userSliceApi = UserApi.injectEndpoints({
  endpoints: (builder) => ({
    //This Fetch all Users from the Api and Store it in our Redux Store
    getAllUsers: builder.query({
      query: () => "/users",
      transformResponse: (res: fullUserType[]) => {
        const userData: fullUserType[] = res;
        return userAdapter.setAll(initialState, userData);
      },
      //It provides a Tag for the whole user list and a tag for each individual User
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "User" as const, id: id })),
              { type: "User", id: "ALL" },
            ]
          : [{ type: "User", id: "ALL" }],
    }),
    //This Fetch one User based on his ID and returns it without saving it in the store
    getCurrentUser: builder.query({
      query: (id: number) => `/users/${id}`,
      transformResponse: (res: fullUserType) => {
        let currentUser = res;
        return currentUser;
      },
    }),
    //This Post a new User to our UserApi
    addUser: builder.mutation({
      query: (user: fullUserType) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      //It Invalidates the Whole User list
      invalidatesTags: ["User"],
    }),
    //This Patches the Information of a User in the Api Following the Reset of a Password, it Saves the old password for history purposes.
    passwordReset: builder.mutation({
      query: ({ passwordChange, id }: passwordResetType) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: passwordChange,
      }),
      //It Invalidates only the User that was patched
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    //This Patches the Information of a User in the Api Following a Modification of the User's Favorites.
    favorite: builder.mutation({
      query: ({ user, id }: favoriteMutationType) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: user,
      }),
      //It Invalidates only the User that was patched
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    //This Patches the Information of a User in the Api Following a Modification of the User's Favorite Color.
    color: builder.mutation({
      query: ({ user, id }: colorMutation) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: user,
      }),
      //It Invalidates only the User that was patched
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});
//Export All Custom RTK Query Hooks from our Api
export const {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useAddUserMutation,
  usePasswordResetMutation,
  useFavoriteMutation,
  useColorMutation,
} = userSliceApi;
