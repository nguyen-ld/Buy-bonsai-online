import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingHorizontal: 24,
		paddingVertical: 15,
	},
	containerItemPrice: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	provisional: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},
	shippingCost: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},
	total: {
		fontFamily: "Medium",
		fontSize: 18,
		lineHeight: 24,
	},
	price: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},
	totalPrice: {
		fontFamily: "Medium",
		fontSize: 18,
		lineHeight: 24,
		color: "#007537",
	},
	containerBtn: {
		marginHorizontal: -25,
		marginBottom: -10,
	},
});
