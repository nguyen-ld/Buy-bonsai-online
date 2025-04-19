import { StatusBar, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	images: {
		width: "100%",
		resizeMode: "contain",
		height: 341,
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
	containerInfo: {
		marginTop: 15,
		marginHorizontal: 23,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconCheckBox: {
		width: 24,
		height: 24,
		marginRight: 5,
	},
	containerCheckbox: {
		flexDirection: "row",
		alignContent: "center",
	},
	titleRemember: {
		fontFamily: "Medium",
		fontSize: 16,
	},
	resetPassWord: {
		fontFamily: "Medium",
		color: "#007537",
		fontSize: 16,
	},
	options: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 25,
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
	},
	createAccount: {
		color: "#009245",
		fontSize: 16,
	},
	containerError: {
		marginTop: 15,
		marginHorizontal: 25,
	},
	error: {
		color: "red",
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},
});
