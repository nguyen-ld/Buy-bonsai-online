import { TextInput, View, Image, Pressable } from "react-native";
import { useState, useCallback, memo, forwardRef } from "react";

import { styles } from "../stylesComponents/stylesInputComponents.js";

const Input = forwardRef(
	({ placeholder, password, value, onChangeText, error }, ref) => {
		const [isFocus, setIsFocus] = useState(false);
		const [isPassWord, setIsPassWord] = useState(false);

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
			<View
				style={[
					styles.container,
					isFocus && styles.isFocus,
					error && styles.isError,
				]}
			>
				<TextInput
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
					style={styles.inputValue}
					secureTextEntry={password && !isPassWord}
					value={value}
					onChangeText={onChangeText}
					ref={ref}
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
);

export default memo(Input);
