import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedItem: [],
};

const cartSlide = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleSelectedItem: (state, action) => {
			const itemID = action.payload;
			const index = state.selectedItem.indexOf(itemID);

			if (index > -1) {
				state.selectedItem.splice(index, 1);
			} else {
				state.selectedItem.push(itemID);
			}
		},
	},
});

export const { toggleSelectedItem } = cartSlide.actions;
export default cartSlide.reducer;
