import { TextInput, View, Image, Pressable } from "react-native";
import { useState, useCallback, memo } from "react";

import { styles } from "../stylesComponents/stylesInputComponents.js";

function Input({ placeholder, password, value, onChangeText }) {
	const [isFocus, setIsFocus] = useState(false);
	const [isPassWord, setIsPassWord] = useState(false);
	console.log("input re-render");
	const handleFocus = useCallback(() => {
		setIsFocus(true);
	}, []);

	const handleBlur = useCallback(() => {
		setIsFocus(false);
	}, []);

	const handleShowPass = useCallback(() => {
		setIsPassWord(!isPassWord);
	}, [isPassWord]);
	return (
		<View style={[styles.container, isFocus && styles.isFocus]}>
			<TextInput
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder}
				style={styles.inputValue}
				secureTextEntry={password && !isPassWord}
				value={value}
				onChangeText={onChangeText}
			/>
			{password ? (
				<Pressable onPress={handleShowPass}>
					<Image
						style={styles.eye}
						source={
							!isPassWord
								? require("../../assets/eye-hide.png")
								: require("../../assets/eye.png")
						}
					/>
				</Pressable>
			) : null}
		</View>
	);
}

export default memo(Input);
