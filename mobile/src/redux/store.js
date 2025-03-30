import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../redux/slice/authSlide";
import { customerApi } from "./service/loginService";

export const store = configureStore({
	reducer: { authReducer, [customerApi.reducerPath]: customerApi.reducer },

	// tắt những tính năng như catching , invalidation , polling của rtk-query
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(customerApi.middleware),
});
setupListeners(store.dispatch);
