import { View, Text, TouchableOpacity } from "react-native";

import styles from "../stylesComponents/stylesButtonComponents";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

function Button({ title, onPress, disable }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={1}
				onPress={onPress}
				disabled={disable}
			>
				<LinearGradient
					colors={
						disable
							? ["#ABABAB", "#ABABAB"]
							: ["#007537", "#4CAF50"]
					}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.gradient}
				>
					<Text style={styles.title}>{title}</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
}

export default Button;
