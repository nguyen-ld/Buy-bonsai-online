import { Pressable, Text, View, Image } from "react-native";
import { styles } from "../stylesComponents/stylesPropertiesComponents";
import { useFonts } from "expo-font";
import Button from "../uiComponents/Button";
import { useState } from "react";

function Properties({ onChange, item, onBuy }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	const [quantity, setQuantity] = useState(0);

	const handleMinus = () => {
		if (quantity > 0) {
			const updateQuantity = quantity - 1;
			setQuantity(updateQuantity);
			onChange && onChange(updateQuantity);
		} else {
			console.log("k thể nhỏ hơn 0 ");
		}
	};

	const handlePlus = () => {
		if (quantity < 5) {
			const updateQuantity = quantity + 1;
			setQuantity(updateQuantity);
			onChange && onChange(updateQuantity);
		} else {
			console.log("Đã quá số lượng cho phép");
		}
	};

	const totalPrice = quantity * item.gia_san_pham;

	return (
		<View style={styles.container}>
			<View style={styles.containerHeader}>
				<View style={styles.headerLeft}>
					<Text style={styles.titleHeaderLeft}>
						Đã chọn {quantity} sản phẩm
					</Text>
					<View style={styles.containerQuantity}>
						<Pressable onPress={handleMinus}>
							<Image
								source={require("../../assets/minus-square.png")}
								style={styles.minus}
							/>
						</Pressable>
						<Text style={styles.numberQuantity}>{quantity}</Text>
						<Pressable onPress={handlePlus}>
							<Image
								source={require("../../assets/plus-square.png")}
								style={styles.plus}
							/>
						</Pressable>
					</View>
				</View>
				<View style={styles.headerRight}>
					<Text style={styles.titleHeaderRight}>Tạm tính</Text>
					<Text style={styles.price}>
						{totalPrice.toLocaleString()} đ
					</Text>
				</View>
			</View>
			<View style={styles.buttonBuy}>
				<Button
					title="CHỌN MUA"
					disable={quantity === 0}
					onPress={onBuy}
				/>
			</View>
		</View>
	);
}

export default Properties;
