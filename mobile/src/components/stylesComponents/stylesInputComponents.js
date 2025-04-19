import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		borderWidth: 1,
		marginHorizontal: 25,
		borderRadius: 10,
		marginTop: 10,
		borderColor: "#8B8B8B",
	},
	inputValue: {
		fontFamily: "Medium",
		fontSize: 16,
		paddingHorizontal: 10,
		flex: 1,
		height: 43,
	},
	isFocus: {
		borderColor: "#007537",
		borderWidth: 2,
	},
	eye: {
		width: 24,
		height: 24,
		marginHorizontal: 16,
	},
	isError: {
		borderColor: "red",
	},
});
