import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},
	header: {
		backgroundColor: "#F6F6F6",
		position: "relative",
		paddingTop: 50,
	},
	images: {
		width: "100%",
		height: 205,
		resizeMode: "cover",
	},
	containerTitle: {
		position: "absolute",
		top: 45,
		left: 25,
	},
	title: {
		fontFamily: "Medium",
		fontSize: 24,
		lineHeight: 37,
		fontWeight: "500",
	},
	content: {
		fontFamily: "Medium",
		fontSize: 16,
		color: "#007537",
		paddingTop: 10,
	},
	containerContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 48,
		height: 46,
	},
	containerIcon: {
		position: "absolute",
		right: 20,
		top: 30,
	},
	body: {
		marginLeft: 25,
		marginTop: 10,
		flex: 1,
	},
	categoryTitle: {
		fontFamily: "Medium",
		fontSize: 24,
		marginVertical: 10,
		color: "#221F1F",
		lineHeight: 34,
	},
	seeMore: {
		fontSize: 16,
		color: "#221F1F",
		lineHeight: 20,
		textDecorationLine: "underline",
		textAlign: "right",
		fontFamily: "Medium",
		marginVertical: 15,
		marginRight: 25,
	},
	containerCombo: {
		marginHorizontal: 20,
		marginVertical: 15,
	},
	containerTitleCombo: {
		fontFamily: "Medium",
		fontSize: 24,
		lineHeight: 34,
		marginVertical: 10,
		color: "#221F1F",
	},
	info: {
		backgroundColor: "#F6F6F6",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 8,
	},
	contentCombo: {
		padding: 15,
		width: "70%",
	},
	imageCombo: {
		resizeMode: "contain",
		width: 108,
		height: 134,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
	},
	TitleCombo: {
		fontSize: 16,
		lineHeight: 22,
		fontFamily: "Medium",
		color: "#221F1F",
	},
	textCombo: {
		fontFamily: "Medium",
		fontSize: 14,
		color: "#7D7B7B",
		lineHeight: 20,
	},
});
