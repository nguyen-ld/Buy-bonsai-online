import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		marginHorizontal: 24,
	},
	containerHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 15,
	},
	titleHeaderLeft: {
		fontFamily: "Medium",
		fontSize: 14,
		color: "#000000",
		lineHeight: 20,
		opacity: 0.6,
	},
	containerQuantity: {
		marginVertical: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	minus: {
		width: 30,
		height: 30,
		borderColor: "#7D7B7B",
	},
	numberQuantity: {
		fontFamily: "Medium",
		fontSize: 18,
		color: "#000000",
		lineHeight: 20,
	},
	plus: {
		width: 30,
		height: 30,
	},
	titleHeaderRight: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
		opacity: 0.6,
		textAlign: "right",
	},
	price: {
		fontFamily: "Medium",
		fontSize: 24,
		lineHeight: 34,
		textAlign: "right",
	},
	buttonBuy: {
		marginHorizontal: -23,
		marginTop: -20,
	},
});
