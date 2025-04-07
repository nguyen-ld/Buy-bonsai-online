import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	items: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderColor: "#ABABAB",
	},
	priceProducts: {
		color: "#007537",
		fontSize: 24,
		lineHeight: 34,
		fontFamily: "Medium",
	},
	containerTitle: {
		borderBottomWidth: 1,
		borderColor: "#221F1F",
	},
	valueItems: {
		fontSize: 14,
		fontFamily: "Light",
	},
	quantityItems: {
		fontSize: 14,
		fontFamily: "Light",
		color: "#007537",
	},
});
