import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { styles } from "../styles/VerifyOTPStyles";
import { TextInput } from "react-native-gesture-handler";
import Button from "../../components/uiComponents/Button";

function VerifyOTP({ route }) {
	const email = route.params.email;
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Verification </Text>
			<Text style={styles.content}>
				Chúng tôi đã gửi mã xác minh tới email : {email}
			</Text>

			<View style={styles.containerInput}>
				<TextInput
					style={styles.input}
					placeholder="-"
					maxLength={1}
					placeholderTextColor="gray"
				/>
				<TextInput
					style={styles.input}
					placeholder="-"
					maxLength={1}
					placeholderTextColor="gray"
				/>
				<TextInput
					style={styles.input}
					placeholder="-"
					maxLength={1}
					placeholderTextColor="gray"
				/>
				<TextInput
					style={styles.input}
					placeholder="-"
					maxLength={1}
					placeholderTextColor="gray"
				/>
			</View>
			<Button title="Xác nhận" />
		</View>
	);
}

export default VerifyOTP;
