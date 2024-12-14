//Import Dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//Create our User Api that will work with RTK Query
const UserApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["User"],
  //The endpoints are gonna be injected from the userSlice
  endpoints: (builder) => ({}),
});

export default UserApi;
