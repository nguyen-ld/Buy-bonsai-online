import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../redux/slice/authSlide";
import { customerApi } from "./service/customerService";
import { homeApi } from "./service/homeService";
import { plantApi } from "./service/plantService";

export const store = configureStore({
	reducer: {
		authReducer,
		[customerApi.reducerPath]: customerApi.reducer,
		[homeApi.reducerPath]: homeApi.reducer,
		[plantApi.reducerPath]: plantApi.reducer,
	},

	// tắt những tính năng như catching , invalidation , polling của rtk-query
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(customerApi.middleware)
			.concat(homeApi.middleware)
			.concat(plantApi.middleware),
});
setupListeners(store.dispatch);
