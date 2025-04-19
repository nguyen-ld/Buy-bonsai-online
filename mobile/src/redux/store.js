import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../redux/slice/authSlide";
import { customerApi } from "./service/customerService";
import { homeApi } from "./service/homeService";
import { plantApi } from "./service/plantService";
import { cartApi } from "./service/cartServices";
import cartReducer from "../redux/slice/cartSlide";
import { productApi } from "./service/productService";
import { methodApi } from "./service/methodServices";
import methodReducer from "./slice/methodSlide";

export const store = configureStore({
	reducer: {
		authReducer,
		cartReducer,
		methodReducer,
		[customerApi.reducerPath]: customerApi.reducer,
		[homeApi.reducerPath]: homeApi.reducer,
		[plantApi.reducerPath]: plantApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[methodApi.reducerPath]: methodApi.reducer,
	},

	// tắt những tính năng như catching , invalidation , polling của rtk-query
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(customerApi.middleware)
			.concat(homeApi.middleware)
			.concat(plantApi.middleware)
			.concat(cartApi.middleware)
			.concat(productApi.middleware)
			.concat(methodApi.middleware),
});
setupListeners(store.dispatch);
