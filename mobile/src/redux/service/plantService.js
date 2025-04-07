import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@env";

export const plantApi = createApi({
	reducerPath: "plantApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: (build) => ({
		plantRequest: build.query({
			query: (id_danh_muc) => `list-products/${id_danh_muc}`,
		}),
		newPlantRequest: build.query({
			query: () => "new-plant-list",
		}),
		plantByCharacteristics: build.query({
			query: (dac_diem) => `plant-list/${dac_diem}`,
		}),
	}),
});

export const {
	usePlantRequestQuery,
	useNewPlantRequestQuery,
	usePlantByCharacteristicsQuery,
} = plantApi;
