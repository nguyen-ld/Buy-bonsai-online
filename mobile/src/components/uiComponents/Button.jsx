import { View, Text, TouchableOpacity } from "react-native";

import styles from "../stylesComponents/stylesButtonComponents";
import { LinearGradient } from "expo-linear-gradient";

function Button({ title, onPress }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={1} onPress={onPress}>
				<LinearGradient
					colors={["#007537", "#4CAF50"]}
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
