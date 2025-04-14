import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	containerHeader: {
		flexDirection: "row",
		marginHorizontal: 48,
		marginVertical: 15,
		alignItems: "center",
		gap: 26,
	},
	fullname: {
		fontFamily: "Bold",
		fontSize: 16,
		color: "#000000",
		lineHeight: 22,
	},
	email: {
		fontFamily: "Medium",
		color: "#7F7F7F",
		fontSize: 14,
		lineHeight: 20,
	},
	containerBody: {
		marginHorizontal: 48,
		marginVertical: 15,
	},
	boxTitle: {
		borderColor: "#ABABAB",
		borderBottomWidth: 1,
		marginBottom: 10,
	},
	title: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 20,
		color: "#7F7F7F",
		paddingBottom: 10,
	},
	contentTitle: {
		lineHeight: 22,
		fontSize: 16,
		fontFamily: "Bold",
		paddingVertical: 8,
	},
	distance: {
		marginTop: 25,
	},
	logout: {
		color: "#FF0000",
	},
});
