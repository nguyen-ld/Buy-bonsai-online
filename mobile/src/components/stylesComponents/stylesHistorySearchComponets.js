import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		marginHorizontal: 45,
		marginTop: 15,
	},
	timer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	containerItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	remove: {
		width: 14,
		height: 14,
	},
	nameSearch: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
		color: "#221F1F",
	},
});
