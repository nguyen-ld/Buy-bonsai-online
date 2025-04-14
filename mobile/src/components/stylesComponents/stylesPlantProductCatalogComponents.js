import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	containerTabs: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 13,
		paddingHorizontal: 27,
		marginTop: 10,
		marginBottom: 15,
	},
	title: {
		fontSize: 14,
		fontFamily: "Medium",
		color: "#7D7B7B",
		lineHeight: 20,
	},
	selected: {
		backgroundColor: "#009245",
		color: "white",
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 4,
	},
});
