import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		position: "absolute",
		bottom: 15,
		width: "100%",
	},
	containerPrice: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 28,
	},
	containerButton: {
		backgroundColor: "#007537",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 30,
		marginHorizontal: 28,
		borderRadius: 8,
		marginTop: 10,
	},
	titleButton: {
		color: "white",
		fontSize: 17,
		fontFamily: "Medium",
		lineHeight: 20,
	},
	titlePrice: {
		fontSize: 16,
		fontFamily: "Medium",
		lineHeight: 20,
	},
	priceCurrents: {
		fontSize: 16,
		fontFamily: "Medium",
		fontWeight: "bold",
		lineHeight: 20,
	},
});
