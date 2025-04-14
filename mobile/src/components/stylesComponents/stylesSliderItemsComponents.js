import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
	container: {
		width: width,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F6F6F6",
		paddingVertical: 50,
	},
	image: {
		width: width * 0.9,
		height: 175,
		resizeMode: "contain",
	},
});
