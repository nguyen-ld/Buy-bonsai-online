import { Text, View } from "react-native";
import { styles } from "../stylesComponents/stylesConfirmCheckoutComponnents";
import { useFonts } from "expo-font";

import Button from "../uiComponents/Button";

function ConfirmCheckout({ total, shipping }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	return (
		<View style={styles.container}>
			<View style={styles.containerItemPrice}>
				<Text style={styles.provisional}>Tạm tính</Text>
				<Text style={styles.price}>{total?.toLocaleString()} đ</Text>
			</View>
			<View style={styles.containerItemPrice}>
				<Text style={styles.shippingCost}>Phí vận chuyển</Text>
				<Text style={styles.price}>{shipping?.toLocaleString()} đ</Text>
			</View>
			<View style={styles.containerItemPrice}>
				<Text style={styles.total}>Tổng tiền</Text>
				<Text style={styles.totalPrice}>
					{(total + shipping).toLocaleString()} đ
				</Text>
			</View>
			<View style={styles.containerBtn}>
				<Button title="TIẾP TỤC" />
			</View>
		</View>
	);
}

export default ConfirmCheckout;
