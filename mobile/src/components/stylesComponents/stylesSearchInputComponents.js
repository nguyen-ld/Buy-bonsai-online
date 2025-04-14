import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginTop: -10,
	},
	input: {
		width: "90%",
		fontSize: 16,
		fontFamily: "Medium",
	},
	focus: {
		color: "#221F1F",
	},
	blur: {
		color: "#ABABAB",
	},
	containerInput: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#221F1F",
		marginHorizontal: 24,
		color: "#221F1F",
	},
});
