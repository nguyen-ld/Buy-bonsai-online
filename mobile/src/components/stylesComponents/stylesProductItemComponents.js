import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		marginHorizontal: 30,
		marginVertical: 15,
	},
	containerItems: {
		flexDirection: "row",
		alignItems: "center",
		gap: 25,
	},
	blockProducts: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
		flex: 1,
	},
	properties: {
		flexDirection: "row",
		alignItems: "center",
	},
	boxChangeQuantity: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
	},
	changeCart: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		gap: 50,
	},
	imageProduct: {
		width: 85,
		height: 85,
		backgroundColor: "#F6F6F6",
		borderRadius: 8,
	},
	plus: {
		width: 24,
		height: 24,
	},
	minus: {
		width: 24,
		height: 24,
	},
	nameProduct: {
		fontSize: 16,
		lineHeight: 22,
		fontFamily: "Medium",
	},
	priceCart: {
		fontSize: 16,
		color: "#007537",
		marginTop: 3,
		fontFamily: "Medium",
	},
	characteristic: {
		fontSize: 16,
		color: "#7D7B7B",
		fontFamily: "Medium",
		flexShrink: 1,
		flexWrap: "wrap",
	},
	delete: {
		fontSize: 16,
		lineHeight: 20,
		borderBottomWidth: 1,
		fontFamily: "Medium",
	},
	quantity: {
		fontSize: 16,
		fontFamily: "Medium",
	},
	line: {
		fontSize: 16,
		fontFamily: "Medium",
	},
	quantityProducts: {
		fontSize: 14,
		fontFamily: "Medium",
		lineHeight: 22,
		marginTop: 5,
	},
	success: {
		fontFamily: "Medium",
		fontSize: 16,
		color: "#007537",
	},
});
