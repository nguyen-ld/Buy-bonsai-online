import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
		width: "50%",
	},
	containerImages: {
		width: width,
	},
	containerContent: {
		marginTop: 15,
		marginHorizontal: 12,
	},
	image: {
		borderRadius: 8,
		backgroundColor: "#F6F6F6",
		height: 134,
		width: 155,
		resizeMode: "contain",
	},
	titleProducts: {
		fontSize: 17,
		fontFamily: "Medium",
		color: "#221F1F",
		textTransform: "capitalize",
	},
	characteristicProducts: {
		fontFamily: "Medium",
		fontSize: 16,
		color: "#7D7B7B",
		marginVertical: 3,
	},
	priceProducts: {
		fontSize: 16,
		fontFamily: "Medium",
		color: "#007537",
	},
});
