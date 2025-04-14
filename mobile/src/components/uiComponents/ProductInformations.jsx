import { Text, View } from "react-native";
import { styles } from "../stylesComponents/stylesProductInformationsComponents";
import { useFonts } from "expo-font";

function ProductInformations({ item }) {
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
			<Text style={styles.priceProduct}>
				{item.gia_san_pham.toLocaleString()}đ
			</Text>
			<Text style={styles.title}>Chi tiết sản phẩm</Text>
			<View style={styles.line} />
			<View style={styles.containerItemInfo}>
				<View style={styles.itemInfo}>
					<Text style={styles.subTilte}>Kích cỡ</Text>
					<Text style={styles.value}>
						{item.chi_tiet_cay_trongs[0].size}
					</Text>
				</View>
				<View style={styles.lineItem} />
				<View style={styles.itemInfo}>
					<Text style={styles.subTilte}>Xuất xứ</Text>
					<Text style={styles.value}>
						{item.chi_tiet_cay_trongs[0].xuat_xu}
					</Text>
				</View>
				<View style={styles.lineItem} />
				<View style={styles.itemInfo}>
					<Text style={styles.subTilte}>Tình trạng</Text>
					<Text style={[styles.value, styles.valueQuantity]}>
						Còn {item.kho_san_phams[0].tinh_trang} sp
					</Text>
				</View>
				<View style={styles.lineItem} />
			</View>
		</View>
	);
}

export default ProductInformations;
