import { View, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import { styles } from "../stylesComponents/stylesPlantProductCatalogComponents";
import { useState } from "react";

function PlantProductCatalog({ categories, setSelectedCategory }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [selected, setSelected] = useState(categories[0]);

	return (
		<View style={styles.container}>
			<View style={styles.containerTabs}>
				{categories.map((category, index) => {
					return (
						<TouchableOpacity
							key={index}
							onPress={() => {
								setSelectedCategory(category);
								setSelected(category);
							}}
						>
							<Text
								style={[
									styles.title,
									selected === category && styles.selected,
								]}
							>
								{category}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

export default PlantProductCatalog;
