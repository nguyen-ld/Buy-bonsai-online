import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingHorizontal: 48,
		paddingBottom: 10,
	},
	title: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},

	line: {
		borderColor: "#221F1F",
		borderBottomWidth: 0.5,
		marginTop: 8,
	},
	itemInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 15,
	},
	lineItem: {
		borderColor: "#ABABAB",
		borderBottomWidth: 0.55,
		marginTop: 8,
	},
	subTilte: {
		fontFamily: "Lato",
		fontSize: 14,
		lineHeight: 20,
		color: "#3A3A3A",
	},
	value: {
		fontFamily: "Lato",
		fontSize: 14,
		lineHeight: 20,
		color: "#3A3A3A",
	},
	valueQuantity: {
		color: "#007537",
	},
	priceProduct: {
		fontSize: 24,
		lineHeight: 34,
		fontFamily: "Medium",
		marginBottom: 15,
		color: "#007537",
	},
	use: {
		textAlign: "right",
		flexWrap: "wrap",
		flex: 1,
		marginLeft: 30,
	},
	titleUse: {
		textAlign: "right",
	},
	subTitleUse: {
		width: "30%",
	},
});
