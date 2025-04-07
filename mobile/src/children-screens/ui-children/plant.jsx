import { FlatList, StatusBar, Text, View } from "react-native";
import { styles } from "../styles-children/stylesPlant";
import { useEffect, useState } from "react";

import Header from "../../components/uiComponents/Header";
import PlantProductCatalog from "../../components/uiComponents/PlantProductCatalog";
import CONSTRANT from "../../config/config";
const category = ["Tất cả", "Hàng mới về", "Ưa bóng", "Ưa sáng"];
import * as plantService from "../../redux/service/plantService";
import Loading from "../../components/uiComponents/Loading";
import Products from "../../components/uiComponents/Product";

function Plant({ route, navigation }) {
	const [selectCategory, setSelectCategory] = useState(category[0]);
	const [products, setProducts] = useState({});

	const handleSelected = (item) => {
		setSelectCategory(item);
	};
	const { data: plantData, isLoading: isPlantLoaing } =
		plantService.usePlantRequestQuery(route.params.id_danh_muc);

	const { data: newPlantData, isLoading: isNewPlantLoaing } =
		plantService.useNewPlantRequestQuery();

	const { data: plantLightData, isLoading: isPlantLightLoaing } =
		plantService.usePlantByCharacteristicsQuery(CONSTRANT.LIGHT);

	const { data: plantShadeData, isLoading: isPlantShadeLoaing } =
		plantService.usePlantByCharacteristicsQuery(CONSTRANT.SHADE);

	useEffect(() => {
		const fetchProducts = () => {
			const index = category.indexOf(selectCategory);
			switch (index) {
				case 0:
					if (plantData) {
						setProducts(plantData);
					}
					break;
				case 1:
					if (newPlantData) {
						setProducts(newPlantData);
					}
					break;
				case 2:
					if (plantShadeData) {
						setProducts(plantShadeData);
					}
					break;
				case 3:
					if (plantLightData) {
						setProducts(plantLightData);
					}
					break;
				default:
					setProducts(plantData);
					break;
			}
		};
		fetchProducts();
	}, [
		selectCategory,
		plantData,
		newPlantData,
		plantLightData,
		plantShadeData,
	]);
	const isAnyLoading =
		isPlantLoaing ||
		isNewPlantLoaing ||
		isPlantLightLoaing ||
		isPlantShadeLoaing;

	const handleBack = () => {
		navigation.goBack();
	};

	console.log(products);
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="transparent" translucent />
			<Header
				onBack={handleBack}
				isIconLeft={true}
				isIconRight={true}
				title="Cây trồng"
				nameIcon="cart-outline"
			/>
			<PlantProductCatalog
				categories={category}
				setSelectedCategory={handleSelected}
			/>
			<View style={styles.containerProduct}>
				{isAnyLoading ? (
					<Loading visible={isPlantLoaing} />
				) : products ? (
					<FlatList
						data={products.data}
						keyExtractor={(item) => item.id_san_pham.toString()}
						renderItem={({ item }) => <Products item={item} />}
						numColumns={2}
						scrollEnabled={true}
						contentContainerStyle={{ flexGrow: 1 }}
						columnWrapperStyle={{
							justifyContent: "flex-start",
							flex: 1,
							gap: 10,
						}}
						scrollIndicatorInsets={false}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<View>
						<Text style={styles.nullPlant}>
							Hiện tại chưa có cây trồng nào !
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}

export default Plant;
