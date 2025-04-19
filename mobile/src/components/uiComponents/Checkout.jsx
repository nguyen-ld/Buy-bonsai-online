import { Pressable, Text, View } from "react-native";
import { styles } from "../stylesComponents/stylesCheckoutComponents";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
function Checkout({ totalPrice, onPress }) {
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
			<View style={styles.containerPrice}>
				<Text style={styles.titlePrice}>Tạm tính</Text>
				<Text style={styles.priceCurrents}>
					{totalPrice?.toLocaleString()} đ
				</Text>
			</View>
			<Pressable style={styles.containerButton} onPress={onPress}>
				<Text style={styles.titleButton}>Tiến hành thanh toán</Text>
				<Ionicons
					name="chevron-forward-outline"
					size={24}
					color="white"
				/>
			</Pressable>
		</View>
	);
}

export default Checkout;
