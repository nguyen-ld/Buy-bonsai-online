import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 20,
	},
	title: {
		fontFamily: "Medium",
		fontSize: 22,
		marginTop: 10,
	},
	content: {
		fontFamily: "Light",
		fontSize: 16,
		paddingRight: 40,
	},
	input: {
		width: 55,
		height: 55,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#dadada",
		textAlign: "center",
		paddingHorizontal: 20,
		paddingVertical: 0,
		fontFamily: "Medium",
		fontSize: 24,
	},
	containerInput: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 20,
	},
});
