import {
	Keyboard,
	KeyboardAvoidingView,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { styles } from "../styles/ChangePasswordStyles";
import { useFonts } from "expo-font";
import { useRef, useState } from "react";
import Input from "../../components/uiComponents/Input";
import Button from "../../components/uiComponents/Button";

function ChangePassword() {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	// state
	const [passNew, setPassNew] = useState(null);
	const [confirmPass, setConfirmPass] = useState(null);
	const [error, setError] = useState({
		pass_new: null,
		confirm_pass: null,
	});

	const passNewRef = useRef(null);
	const confirmPassRef = useRef(null);

	// const validate = () => {
	// 	let check = true;
	// 	const newError = { pass_new: null, confirm_pass: null };
	// 	if (!passNew) {
	// 		check = false;
	// 		newError.pass_new = "Vui lòng nhập mật khẩu mới ";
	// 		passNewRef.current.focus();
	// 	} else if (!confirmPass) {
	// 		check = false;
	// 		newError.confirm_pass = "Vui lòng nhập lại mật khẩu mới ";
	// 		confirmPassRef.current.focus();
	// 	}
	// 	setError(newError);

	// 	return check;
	// };

	const handleUpdatePassword = () => {
		validate();
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<Text style={styles.newPassword}>Đặt mật khẩu mới</Text>
					<Text style={styles.titleNewPassword}>
						Tạo mật khẩu mới. Đảm bảo mật khẩu này khác với mật khẩu
						trước đó để bảo mật
					</Text>
					<Text style={styles.passNew}>Mật khẩu mới</Text>
					<View style={styles.containerInputData}>
						<Input
							ref={passNewRef}
							password={true}
							placeholder="Nhập mật khẩu mới"
							value={passNew}
							onChangeText={(text) => {
								setPassNew(text);
								setError((prev) => ({
									...prev,
									pass_new: null,
								}));
							}}
						/>
					</View>
					{error.pass_new && (
						<View style={styles.containerError}>
							<Text style={styles.error}>{error.pass_new}</Text>
						</View>
					)}
					<Text style={styles.confirmPasword}>Xác nhận mật khẩu</Text>
					<View style={styles.containerInputData}>
						<Input
							ref={confirmPassRef}
							password={true}
							placeholder="Nhập lại mật khẩu"
							value={confirmPass}
							onChangeText={(text) => {
								setConfirmPass(text);
								setError((prev) => ({
									...prev,
									confirm_pass: null,
								}));
							}}
						/>
					</View>
					{error.confirm_pass && (
						<View style={styles.containerError}>
							<Text style={styles.error}>
								{error.confirm_pass}
							</Text>
						</View>
					)}
					<View style={styles.containerBtnUpdate}>
						<Button
							title="Cập nhật mật khẩu"
							disable={
								passNew?.trim() &&
								confirmPass?.trim() &&
								passNew !== null &&
								confirmPass !== null
									? false
									: true
							}
							onPress={handleUpdatePassword}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

export default ChangePassword;
