import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customer } from "../../models/customer";

export const customerApi = createApi({
	reducerPath: "customerApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://10.0.2.2:5000/api/" }),
	endpoints: (build) => ({
		login: build.mutation({
			query: (userData) => ({
				url: "login",
				method: "POST",
				body: userData,
			}),
		}),
	}),
});

export const { useLoginMutation } = customerApi;
