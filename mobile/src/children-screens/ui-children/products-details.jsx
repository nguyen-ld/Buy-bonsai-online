import { StatusBar, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { styles } from "../styles-children/styleProductDetails";
import Header from "../../components/uiComponents/Header";

function ProductsDetails() {
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
			/>
		</View>
	);
}

export default ProductsDetails;
