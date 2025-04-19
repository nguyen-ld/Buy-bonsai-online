import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	images: {
		width: "100%",
		resizeMode: "contain",
		height: 220,
	},
	title: {
		fontSize: 30,
		textAlign: "center",
		fontFamily: "Bold",
		marginTop: 5,
		lineHeight: 40,
	},
	subTitlte: {
		fontFamily: "Medium",
		fontSize: 20,
		textAlign: "center",
		lineHeight: 30,
	},

	options: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 27,
		marginTop: 5,
	},
	line: {
		height: 2,
		flex: 1,
		backgroundColor: "#4CAF50",
	},
	groupImages: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
		marginVertical: 25,
	},
	logo: {
		width: 32,
		height: 32,
	},
	titleFooter: {
		textAlign: "center",
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 30,
	},
	createAccount: {
		color: "#009245",
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 30,
	},
	containerConditional: {
		marginHorizontal: 20,
		marginTop: 15,
		paddingVertical: 8,
	},
	info: {
		fontFamily: "Medium",
		textAlign: "center",
		fontSize: 16,
	},
	conditional: {
		color: "#007537",
		textDecorationLine: "underline",
		fontSize: 16,
	},
	containerBug: {
		marginTop: 10,
		marginHorizontal: 25,
	},
	bug: {
		color: "red",
		fontFamily: "Medium",
		fontSize: 16,
	},
});
