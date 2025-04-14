import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	overlay: {
		backgroundColor: "rgba(236, 236, 236, 0.6)",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	container: {
		backgroundColor: "white",
		width: "90%",
		marginBottom: 15,
		borderRadius: 8,
		elevation: 5,
	},
	body: {
		margin: 24,
	},
	title: {
		textAlign: "center",
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 20,
	},
	content: {
		textAlign: "center",
		fontFamily: "Medium",
		fontSize: 14,
		lineHeight: 20,
		marginTop: 5,
		color: "#7D7B7B",
	},
	btnConfirm: {
		marginHorizontal: -24,
	},
	cancel: {
		textAlign: "center",
		textDecorationLine: "underline",
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 20,
	},
});
