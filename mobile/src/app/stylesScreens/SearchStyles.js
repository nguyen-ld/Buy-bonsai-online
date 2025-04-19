import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	containerView: {
		flex: 1,
	},
	containerError: {
		marginHorizontal: 45,
		marginVertical: 15,
	},
	errortext: {
		fontSize: 16,
		color: "#FF0000",
		fontWeight: 600,
		fontFamily: "Lato",
	},
	titleSearch: {
		marginHorizontal: 45,
		fontSize: 16,
		fontWeight: 400,
		marginTop: 30,
		lineHeight: 22,
	},
	containerNotFound: {
		marginHorizontal: 45,
		marginVertical: 20,
	},
	notFound: {
		fontSize: 16,
		fontFamily: "Lato",
		lineHeight: 22,
		textAlign: "center",
	},
});
