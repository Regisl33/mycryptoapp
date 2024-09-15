import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UserApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

export default UserApi;
