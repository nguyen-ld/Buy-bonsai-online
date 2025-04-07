import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@env";

export const homeApi = createApi({
	reducerPath: "homeApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: (build) => ({
		listOfCategory: build.query({
			query: () => "list-of-category",
		}),
		productLimitList: build.query({
			query: (id_danh_muc) => `product-limit-lists/${id_danh_muc}`,
		}),
	}),
});

export const {
	useListOfCategoryQuery,
	useProductLimitListQuery,
	useLazyProductLimitListQuery,
} = homeApi;
