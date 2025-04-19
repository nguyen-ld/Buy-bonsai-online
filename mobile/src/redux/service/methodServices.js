import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@env";

export const methodApi = createApi({
	reducerPath: "methodApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: (builder) => ({
		getPayMethod: builder.query({
			query: () => "/pay-method-info",
		}),
		getShippingMethod: builder.query({
			query: () => "/shipping-method-info",
		}),
	}),
});

export const { useGetPayMethodQuery, useGetShippingMethodQuery } = methodApi;
