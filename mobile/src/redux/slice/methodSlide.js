import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const methodSlide = createSlice({
	name: "method",
	initialState: {
		selectedShippingId: null,
		selectedPaymentId: null,
	},
	reducers: {
		setSelectedShipping: (state, action) => {
			const { id, price } = action.payload;
			state.selectedShippingId = { id, price };
		},
		setSelectedPayment: (state, action) => {
			state.selectedPaymentId = action.payload;
		},
	},
});

export const { setSelectedPayment, setSelectedShipping } = methodSlide.actions;
export default methodSlide.reducer;
