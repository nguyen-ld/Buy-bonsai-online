import { View, Text } from "react-native";
import { styles } from "../stylesComponents/stylesProductDetailInformationsComponents";
import { useFonts } from "expo-font";

function ProductDetailInformations({
	price,
	title,
	productDetails,
	value,
	isValue,
	quantity,
}) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	return (
		<View style={styles.container}>
			<Text style={styles.priceProducts}>{price}</Text>
			<View style={styles.containerTitle}>
				<Text style={styles.productDetailName}>{productDetails}</Text>
			</View>
			<View style={styles.items}>
				<Text style={styles.valueItems}>{title}</Text>
				{isValue ? (
					<Text style={styles.valueItems}>{value}</Text>
				) : (
					<Text style={styles.quantityItems}>{quantity}</Text>
				)}
			</View>
		</View>
	);
}

export default ProductDetailInformations;
