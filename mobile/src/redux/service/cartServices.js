import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@env";
export const cartApi = createApi({
	reducerPath: "cartApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	tagTypes: ["Cart"],
	endpoints: (builder) => ({
		userCartList: builder.query({
			query: (id_khach_hang) => `cart-list/${id_khach_hang}`,
			providesTags: ["Cart"],
		}),
		changeQuantity: builder.mutation({
			query: ({ id_khach_hang, id_san_pham, quantity }) => ({
				url: `/update-quantity/${id_khach_hang}/san_pham/${id_san_pham}`,
				method: "PATCH",
				body: { quantity },
			}),
			invalidatesTags: ["Cart"],
		}),
		deleteItemInCart: builder.mutation({
			query: ({ id_khach_hang, id_san_pham }) => ({
				url: `/delete-item-cart/khach_hang/${id_khach_hang}/san_pham/${id_san_pham}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Cart"],
		}),
		addToCart: builder.mutation({
			query: (data) => ({
				url: "/addToCart",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),
	}),
});

export const {
	useUserCartListQuery,
	useChangeQuantityMutation,
	useDeleteItemInCartMutation,
	useAddToCartMutation,
} = cartApi;
