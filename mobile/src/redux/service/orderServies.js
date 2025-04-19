import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@env";

export const orderApi = createApi({
	reducerPath: "orderApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: (builder) => ({}),
});

export const {} = orderApi;
