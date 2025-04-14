import { View, Image, Text, Pressable } from "react-native";
import { styles } from "../stylesComponents/stylesProductComponents";
import { useFonts } from "expo-font";

function Products({ item, onPress }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const renderCharacteristics = item.chi_tiet_cay_trongs?.map(
		(detail, index) => {
			return Object.entries(detail).map(([key, value]) => {
				if (key === "dac_diem") {
					return (
						<Text key={index} style={styles.characteristicProducts}>
							{value}
						</Text>
					);
				}
				return null;
			});
		}
	);

	return (
		<View style={styles.container}>
			<Pressable onPress={onPress}>
				<View style={styles.containerImages}>
					<Image
						source={{
							uri: item.hinh_anh,
						}}
						style={styles.image}
					/>
				</View>
				<View style={styles.containerContent}>
					<Text style={styles.titleProducts}>
						{item.ten_san_pham}
					</Text>
					{item.id_danh_muc === 1 && renderCharacteristics}
					<Text style={styles.priceProducts}>
						{Number(item.gia_san_pham).toLocaleString()} đ
					</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default Products;
