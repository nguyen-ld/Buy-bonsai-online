import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../stylesComponents/stylesHistorySearchComponets";
import { useFonts } from "expo-font";

function HistorySearch({ name, onDelete, onReSearch }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	return (
		<View style={styles.container}>
			<View>
				<Pressable
					onPress={() => onReSearch(name)}
					style={styles.containerItem}
				>
					<View style={styles.timer}>
						<Ionicons
							name="time-outline"
							color="#ABABAB"
							size={24}
						/>
						<Text style={styles.nameSearch}>{name}</Text>
					</View>
					<Pressable onPress={() => onDelete(name)}>
						<Image
							source={require("../../assets/remove.png")}
							style={styles.remove}
						/>
					</Pressable>
				</Pressable>
			</View>
		</View>
	);
}

export default HistorySearch;
