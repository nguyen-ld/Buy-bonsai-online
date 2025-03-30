import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { styles } from "../styles/VerifyOTPStyles";
import { TextInput } from "react-native-gesture-handler";

function VerifyOTP() {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
		SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		Light: require("../../assets/fonts/Poppins-Light.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Verification </Text>
			<Text style={styles.content}>
				Chúng tôi đã gửi mã xác minh tới email :{" "}
			</Text>

			<View>
				<TextInput
					style={styles.input}
					placeholder="-"
					maxLength={1}
					placeholderTextColor="gray"
				/>
			</View>
		</View>
	);
}

export default VerifyOTP;
