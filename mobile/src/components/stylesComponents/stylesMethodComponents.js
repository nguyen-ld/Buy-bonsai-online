import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#7D7B7B",
		paddingBottom: 5,
		marginTop: 10,
	},
	containerInfo: {
		gap: 5,
		paddingTop: 8,
	},
	namePrice: {
		fontFamily: "Medium",
		fontSize: 15,
		lineHeight: 20,
		color: "#221F1F",
	},
	date: {
		fontFamily: "Medium",
		fontSize: 15,
		lineHeight: 20,
		color: "#7D7B7B",
	},
	icon: {
		width: 26,
		height: 26,
	},
	selected: {
		color: "#007537",
	},
});
