import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedItem: [],
};

const cartSlide = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleSelectedItem: (state, action) => {
			const {
				id_san_pham,
				so_luong,
				ten_san_pham,
				gia_san_pham,
				hinh_anh,
				dac_diem,
			} = action.payload;
			const existingItem = state.selectedItem.find(
				(item) => item.id_san_pham == id_san_pham
			);

			if (existingItem) {
				state.selectedItem = state.selectedItem.filter(
					(item) => item.id_san_pham !== id_san_pham
				);
			} else {
				state.selectedItem.push({
					id_san_pham,
					so_luong,
					ten_san_pham,
					gia_san_pham,
					hinh_anh,
					dac_diem,
				});
			}
		},
		updateQuantity: (state, action) => {
			const { id_san_pham, so_luong } = action.payload;

			const checkExisting = state.selectedItem.find(
				(item) => item.id_san_pham === id_san_pham
			);

			if (checkExisting) {
				checkExisting.so_luong = so_luong;
			}
		},
	},
});

export const { toggleSelectedItem, updateQuantity } = cartSlide.actions;
export default cartSlide.reducer;
