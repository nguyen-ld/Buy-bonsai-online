import { StatusBar, View, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { styles } from "../styles-children/styleProductDetails";
import { useState } from "react";

import Header from "../../components/uiComponents/Header";
import ProductInformations from "../../components/uiComponents/ProductInformations";
import Properties from "../../components/uiComponents/Properties";
import * as plantServices from "../../redux/service/plantService";
import * as cartServices from "../../redux/service/cartServices";
import PlantProductCatalog from "../../components/uiComponents/PlantProductCatalog";
import CarouselSlide from "../../components/uiComponents/CarouselSlide";
import Loading from "../../components/uiComponents/Loading";

function ProductsDetails({ route, navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const { data, isLoading } = plantServices.usePlantDetailsByIdQuery(
		route.params.id_san_pham
	);

	console.log(data);

	const [addToCart, { isLoading: isAddToCartLoading }] =
		cartServices.useAddToCartMutation();

	let catalogList = [];

	if (data && data?.data?.id_danh_muc === 1) {
		catalogList = [
			data.data.danh_muc.ten_danh_muc,
			data.data.chi_tiet_cay_trongs[0].dac_diem,
		];
	} else {
		catalogList = [];
	}

	const [quantity, setQuantity] = useState(0);
	const [priceCurrent, setPriceCurrent] = useState(0);

	const handleChangeQuantity = (number) => {
		if (!isLoading && data) {
			setQuantity(number);
			setPriceCurrent(data.data.gia_san_pham * number);
		}
	};

	const hanleBuyProducts = async () => {
		try {
			console.log("data request : ", {
				quantity,
				priceCurrent,
				khach_hang: 2,
			});
			const response = await addToCart({
				id_khach_hang: 2,
				quantity: quantity,
				id_product: route.params.id_san_pham,
			});
			if (response) {
				console.log("Đặt hàng thành công");
			} else {
				console.log("Đặt hàng thất bại");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleBack = () => {
		navigation.goBack();
	};

	const handleCart = () => {
		navigation.navigate("cart");
	};

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<StatusBar
				backgroundColor="transparent"
				translucent
				barStyle="dark-content"
			/>
			<Header
				isIconLeft={true}
				title="chi tiết sản phẩm"
				nameIcon="cart-outline"
				isIconRight={true}
				onBack={handleBack}
				onPress={handleCart}
			/>
			<CarouselSlide item={data?.data?.hinh_anh} />
			<View style={styles.catalog}>
				<PlantProductCatalog
					categories={catalogList}
					isCatalog={true}
				/>
			</View>
			{!isLoading && data?.data && (
				<ProductInformations item={data?.data} />
			)}
			{!isLoading && (
				<Properties
					onChange={handleChangeQuantity}
					item={data.data}
					onBuy={hanleBuyProducts}
				/>
			)}
		</ScrollView>
	);
}

export default ProductsDetails;
