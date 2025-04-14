import { View, TextInput, Pressable, Image } from "react-native";
import { styles } from "../stylesComponents/stylesSearchInputComponents";
import { useFonts } from "expo-font";
import { useState } from "react";

function Search({ isSearch, value, onChangeText }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [isFocus, setIsFocus] = useState(false);
	const [isBlur, setIsBlur] = useState(false);

	return (
		<View style={styles.container}>
			<View style={styles.containerInput}>
				<TextInput
					placeholder="Tìm kiếm"
					placeholderTextColor="#ABABAB"
					returnKeyType="search"
					// onSubmitEditing={handleSearch}
					style={[
						styles.input,
						isFocus && styles.focus,
						isBlur && styles.blur,
					]}
					onFocus={() => {
						setIsFocus(true);
						setIsBlur(false);
					}}
					onBlur={() => {
						setIsFocus(false);
						setIsBlur(true);
					}}
					value={value}
					onChangeText={onChangeText}
				/>
				{isSearch && (
					<Pressable
						onPress={() => {
							console.log("click search");
						}}
					>
						<Image source={require("../../assets/search.png")} />
					</Pressable>
				)}
			</View>
		</View>
	);
}

export default Search;
