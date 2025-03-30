import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id_user: null,
	isLoggedIn: false,
};

const authSlide = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.id_user = action.payload.id_user;
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.id_user = null;
			state.isLoggedIn = false;
		},
	},
});

export const { login, logout } = authSlide.actions;

export default authSlide.reducer;
