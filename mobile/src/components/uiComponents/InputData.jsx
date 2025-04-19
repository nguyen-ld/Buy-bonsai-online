import { View, TextInput, Pressable, Image } from "react-native";
import { styles } from "../stylesComponents/stylesInputDataComponents";
import { useFonts } from "expo-font";

function InputData({
	isSearch,
	value,
	onChangeText,
	placeholder,
	returnKeyType,
	onFocus,
	onBlur,
	focus,
	error,
	onSubmitEditing,
	onSearch,
	keyboardType,
	maxLength,
}) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.containerInput,
					focus ? styles.focusBorder : styles.blurBorder,
					error && styles.error,
				]}
			>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor="#ABABAB"
					returnKeyType={returnKeyType}
					style={[styles.input, focus ? styles.focus : styles.blur]}
					value={value}
					onChangeText={onChangeText}
					onFocus={onFocus}
					onBlur={onBlur}
					error={error}
					onSubmitEditing={onSubmitEditing}
					keyboardType={keyboardType}
					maxLength={maxLength}
				/>
				{isSearch && (
					<Pressable onPress={onSearch}>
						<Image source={require("../../assets/search.png")} />
					</Pressable>
				)}
			</View>
		</View>
	);
}

export default InputData;
