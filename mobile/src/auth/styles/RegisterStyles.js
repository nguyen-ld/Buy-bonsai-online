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
		fontFamily: "SemiBold",
		marginTop: 5,
	},
	subTitlte: {
		fontFamily: "Medium",
		fontSize: 20,
		textAlign: "center",
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
	},
	createAccount: {
		color: "#009245",
	},
	containerConditional: {
		marginHorizontal: 20,
		marginTop: 15,
	},
	info: {
		fontFamily: "Medium",
		textAlign: "center",
	},
	conditional: {
		color: "#007537",
	},
});
