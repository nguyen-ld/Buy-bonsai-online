import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		marginTop: -10,
	},
	input: {
		width: "90%",
		fontSize: 16,
		fontFamily: "Medium",
	},
	containerInput: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#221F1F",
	},
	focus: {
		color: "#221F1F",
	},
	blur: {
		color: "#ABABAB",
	},
	focusBorder: {
		borderColor: "#221F1F",
	},
	blurBorder: {
		borderColor: "#ABABAB",
	},
});
