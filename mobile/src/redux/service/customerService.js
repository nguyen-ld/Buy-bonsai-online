import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
	reducerPath: "customerApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://10.0.2.2:5000/api/" }),
	endpoints: (build) => ({
		loginRequest: build.mutation({
			query: (userData) => ({
				url: "login",
				method: "POST",
				body: userData,
			}),
		}),
		createAccountRequest: build.mutation({
			query: (data) => ({
				url: "create-account",
				method: "POST",
				body: data,
			}),
		}),
		sendOTPRequest: build.mutation({
			query: (data) => ({
				url: "send-otp",
				method: "POST",
				body: data,
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
		customerInformation: build.query({
			query: (id_khach_hang) => `customer-information/${id_khach_hang}`,
			invalidatesTags: ["customer"],
		}),
		updateInfoCustomer: build.mutation({
			query: ({ id_khach_hang, data }) => ({
				url: `update-customer/${id_khach_hang}`,
				method: "PATCH",
				body: data,
			}),
			providesTags: ["customer"],
		}),
	}),
});

export const {
	useLoginRequestMutation,
	useCreateAccountRequestMutation,
	useSendOTPRequestMutation,
	useCustomerInformationQuery,
	useUpdateInfoCustomerMutation,
} = customerApi;
