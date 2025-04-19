import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 26,
	},
	containerInputData: {
		marginHorizontal: -26,
	},
	newPassword: {
		fontFamily: "Bold",
		fontSize: 20,
		lineHeight: 24,
	},
	titleNewPassword: {
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
		paddingVertical: 10,
	},
	passNew: {
		marginTop: 15,
		fontFamily: "Medium",
		lineHeight: 22,
		fontSize: 16,
	},
	confirmPasword: {
		fontFamily: "Medium",
		lineHeight: 22,
		fontSize: 16,
		marginTop: 10,
	},
	containerBtnUpdate: {
		marginHorizontal: -26,
		marginTop: 15,
	},
	containerError: {
		marginTop: 15,
	},
	error: {
		color: "red",
		fontFamily: "Medium",
		fontSize: 16,
		lineHeight: 22,
	},
});
