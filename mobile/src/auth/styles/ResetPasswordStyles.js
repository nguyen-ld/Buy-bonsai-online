import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: "#ffffff",
	},
	title: {
		fontFamily: "Bold",
		fontSize: 22,
		marginTop: 10,
	},
	content: {
		fontFamily: "Medium",
		fontSize: 16,
		marginRight: 20,
		paddingVertical: 10,
	},
	inputEmail: {
		marginHorizontal: -25,
	},
	buttonSend: {
		marginHorizontal: -25,
	},
	error: {
		color: "red",
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},
});
