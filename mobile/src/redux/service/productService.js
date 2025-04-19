import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@env";

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	tagTypes: ["Product"],
	endpoints: (builder) => ({
		searchPoduct: builder.mutation({
			query: (ten_san_pham) => ({
				url: `/search-products/${ten_san_pham}`,
				method: "POST",
			}),
		}),
		invalidatesTags: ["Product"],
	}),
});

export const { useSearchPoductMutation } = productApi;
