import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		position: "relative",
	},
	containerScroll: {
		marginHorizontal: 48,
		flex: 1,
	},
	titleCustomer: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
		borderBottomWidth: 0.55,
		borderColor: "#221F1F",
		paddingBottom: 5,
		marginBottom: 8,
	},
	containerInput: {
		marginTop: 12,
	},
	titleMethod: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
		borderColor: "#7D7B7B",
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginTop: 30,
	},
	containerEdit: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 0.55,
		borderColor: "#221F1F",
		paddingBottom: 5,
		marginBottom: 8,
	},
	edit: {
		fontFamily: "Medium",
		fontSize: 14,
		lineHeight: 20,
		color: "#7D7B7B",
	},
	titleCustomerEdit: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},
	itemEdit: {
		paddingTop: 8,
		fontFamily: "Medium",
		fontSize: 14,
		lineHeight: 20,
		color: "#7D7B7B",
	},
	orderItem: {
		marginHorizontal: -28,
	},
});
