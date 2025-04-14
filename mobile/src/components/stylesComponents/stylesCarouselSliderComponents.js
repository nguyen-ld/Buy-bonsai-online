import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
	containerSlide: {
		width: width,
		justifyContent: "center",
		alignItems: "center",
	},
	imageSlide: {
		borderRadius: 10,
		width: width,
		resizeMode: "cover",
	},
	containerDot: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 10,
		left: "50%",
		right: "50%",
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 5,
		marginHorizontal: 5,
	},
	containerMove: {
		position: "absolute",
		width: "100%",
		top: "45%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		zIndex: 1,
	},

	prev: {
		width: 24,
		height: 24,
		borderRadius: 50,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},

	next: {
		width: 24,
		height: 24,
		borderRadius: 18,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
});
