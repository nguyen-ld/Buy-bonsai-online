import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../stylesComponents/stylesMethodComponents";
import { useFonts } from "expo-font";

function Method({ isPrice, isDate, item, onCheck, isSelected }) {
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
		<Pressable onPress={onCheck}>
			<View style={styles.container}>
				<View style={styles.containerInfo}>
					<Text
						style={[
							styles.namePrice,
							isSelected && styles.selected,
						]}
					>
						{item.ten_phuong_thuc}{" "}
						{isPrice && (
							<Text>
								{item?.gia_phuong_thuc.toLocaleString()}đ
							</Text>
						)}
					</Text>
					{isDate && (
						<Text style={styles.date}>
							Dự kiến giao hàng {item?.ngay_giao_du_kien}
						</Text>
					)}
				</View>
				{isSelected && (
					<Image
						source={require("../../assets/check-method.png")}
						style={styles.icon}
					/>
				)}
			</View>
		</Pressable>
	);
}

export default Method;
