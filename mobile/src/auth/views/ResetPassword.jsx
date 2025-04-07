import { View, Text } from "react-native";
import { useFonts } from "expo-font";

import { styles } from "../styles/ResetPasswordStyles";
import Input from "../../components/uiComponents/Input";
import { useState } from "react";
import Button from "../../components/uiComponents/Button";
import { useSendOTPRequestMutation } from "../../redux/service/customerService";
import Loading from "../../components/uiComponents/Loading";

function ResetPassword({ navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [email, setEmail] = useState(null);
	const [error, setError] = useState(null);

	const [sendOTPRequest, { isLoading }] = useSendOTPRequestMutation();

	const validate = () => {
		let check = true;
		if (!email) {
			setError("Vui lòng nhập địa chỉ email. Thử lại!");
			check = false;
		}
		return check;
	};

	const handleSend = async () => {
		if (!validate()) {
			return;
		}
		try {
			console.log(" Request gửi đi:", email);
			const response = await sendOTPRequest({ email }).unwrap(); // trực tiếp data ra mà k cần qua payload
			if (response.status === 200) {
				console.log("gửi otp thành công");
				setError(null);
				navigation.navigate("verify-otp", { email: email });
			}
		} catch (error) {
			console.log(error);
			if (error.data.type === "email-failure") {
				setError(error.data.message);
			} else if (error.data.type === "email-not-exists") {
				setError(error.data.message);
			}
		}
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
					onChangeText={(text) => {
						setEmail(text.trim());
					}}
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

			<Loading visible={isLoading} />
		</View>
	);
}

export default ResetPassword;
