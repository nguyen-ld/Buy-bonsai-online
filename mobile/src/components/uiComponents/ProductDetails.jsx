import { View } from "react-native";
import { styles } from "../stylesComponents/stylesProductDetailsComponents";
import { useFonts } from "expo-font";

function ProductDetails({ children }) {
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
			<View>{children}</View>
		</View>
	);
}

export default ProductDetails;
