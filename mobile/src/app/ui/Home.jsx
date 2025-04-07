import {
	Text,
	View,
	Image,
	StatusBar,
	FlatList,
	ScrollView,
	Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { styles } from "../stylesScreens/HomeStyles";
import { Ionicons } from "@expo/vector-icons";
import * as homeService from "../../redux/service/homeService";
import { useState, useEffect } from "react";
import Products from "../../components/uiComponents/Product";
import Loading from "../../components/uiComponents/Loading";

function Home({ navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const { data: categories, isLoading: loadingCategories } =
		homeService.useListOfCategoryQuery();

	const [triggerProductList] = homeService.useLazyProductLimitListQuery();
	const [allProducts, setAllProducts] = useState([]);

	useEffect(() => {
		const fetchAllProducts = async () => {
			if (!categories) return;

			try {
				const results = await Promise.all(
					categories.data.map((cat) => {
						return triggerProductList(cat.id_danh_muc).unwrap();
					})
				);

				const mergedProducts = results.map((res) => res.data).flat();
				setAllProducts(mergedProducts);
			} catch (err) {
				console.error("Lỗi gọi productLimitList", err);
			}
		};

		fetchAllProducts();
	}, [categories]);

	return (
		<ScrollView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />

			<View style={styles.header}>
				<Image
					source={require("../../assets/bg-home.png")}
					style={styles.images}
				/>
				<View style={styles.containerTitle}>
					<Text style={styles.title}>
						Planta - toả sáng{"\n"}
						không gian nhà bạn
					</Text>
					<View style={styles.containerContent}>
						<Text style={styles.content}>Xem hàng mới về </Text>
						<Ionicons
							style={{ marginTop: 10 }}
							name="arrow-forward-outline"
							size={20}
							color={"#007537"}
						/>
					</View>
				</View>
				<View style={styles.containerIcon}>
					<Image
						source={require("../../assets/cart.png")}
						style={styles.icon}
					/>
				</View>
			</View>

			<View style={styles.body}>
				{!loadingCategories ? (
					categories.data.map((category) => {
						const filteredProducts = allProducts.filter(
							(product) =>
								product.id_danh_muc === category.id_danh_muc
						);

						return (
							<View key={category.id_danh_muc}>
								<Text style={styles.categoryTitle}>
									{category.ten_danh_muc}
								</Text>
								<FlatList
									data={filteredProducts}
									renderItem={({ item }) => (
										<Products item={item} />
									)}
									keyExtractor={(item) =>
										item.id_san_pham.toString()
									}
									numColumns={2}
									scrollEnabled={false}
									columnWrapperStyle={{
										flex: 1,
										justifyContent: "space-between",
									}}
									showsVerticalScrollIndicator={false}
								/>
								<Pressable
									onPress={() =>
										navigation.navigate(
											category.ten_man_hinh,
											{
												id_danh_muc:
													category.id_danh_muc,
											}
										)
									}
								>
									<Text style={styles.seeMore}>
										Xem thêm cây trồng
									</Text>
								</Pressable>
							</View>
						);
					})
				) : (
					<Loading visible={loadingCategories} />
				)}
			</View>
			<View style={styles.containerCombo}>
				<Text style={styles.containerTitleCombo}>
					Combo chăm sóc (mới){" "}
				</Text>
				<View style={styles.info}>
					<View style={styles.contentCombo}>
						<Text style={styles.TitleCombo}>
							Lemon Balm Grow Kit{" "}
						</Text>
						<Text style={styles.textCombo}>
							Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu
							Planta, marker đánh dấu...
						</Text>
					</View>
					<Image
						source={require("../../assets/grow-kit-main.png")}
						style={styles.imageCombo}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

export default Home;
