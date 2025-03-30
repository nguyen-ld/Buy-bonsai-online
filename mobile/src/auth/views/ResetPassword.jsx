import { View, Text } from "react-native";
import { useFonts } from "expo-font";

import { styles } from "../styles/ResetPasswordStyles";
import Input from "../../components/uiComponents/Input";
import { useState } from "react";
import Button from "../../components/uiComponents/Button";

function ResetPassword({ navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
		SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		Light: require("../../assets/fonts/Poppins-Light.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [email, setEmail] = useState(null);
	const [error, setError] = useState(false);

	const validate = () => {
		let check = true;
		if (!email) {
			setError("Vui lòng nhập địa chỉ email. Thử lại!");
			check = false;
		} else {
			return check;
		}
	};

	const handleSend = () => {
		navigation.navigate("verify-otp");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Reset Password</Text>
			<Text style={styles.content}>
				Vui lòng nhập địa chỉ email của bạn để gửi yêu cầu đặt lại mật
				khẩu
			</Text>
			<View style={styles.inputEmail}>
				<Input
					placeholder="Nhập địa chỉ email của bạn"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>

			{error && (
				<View
					style={{
						marginTop: 15,
					}}
				>
					<Text
						style={{
							color: "red",
							fontFamily: "Medium",
						}}
					>
						{error}
					</Text>
				</View>
			)}

			<View style={styles.buttonSend}>
				<Button title="Gửi" onPress={handleSend} />
			</View>
		</View>
	);
}

export default ResetPassword;
