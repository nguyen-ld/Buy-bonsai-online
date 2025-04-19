import { View, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import { styles } from "../stylesComponents/stylesPlantProductCatalogComponents";
import { useState } from "react";

function PlantProductCatalog({ categories, setSelectedCategory, isCatalog }) {
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
				{categories.lnegth > 0 &&
					categories.map((category, index) => {
						return (
							<TouchableOpacity
								key={index}
								activeOpacity={1}
								onPress={
									!isCatalog
										? () => {
												setSelectedCategory(category);
												setSelected(category);
										  }
										: undefined
								}
							>
								<Text
									style={[
										styles.title,
										selected === category &&
											styles.selected,
										isCatalog && styles.selected,
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
