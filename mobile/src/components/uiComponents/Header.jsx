import { Pressable, Text, View } from "react-native";
import { styles } from "../stylesComponents/stylesHeader";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

function Header({ isIconLeft, isIconRight, title, nameIcon, onBack }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	return (
		<View style={styles.container}>
			<View style={styles.containerHeader}>
				<Pressable onPress={onBack}>
					{isIconLeft && (
						<Ionicons name="chevron-back" size={24} color="black" />
					)}
				</Pressable>
				<View>
					<Text style={styles.titleHeader}>{title}</Text>
				</View>
				<Pressable>
					{isIconRight && (
						<Ionicons name={nameIcon} size={24} color="black" />
					)}
				</Pressable>
			</View>
		</View>
	);
}

export default Header;
