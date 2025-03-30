import {
	View,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
	Pressable,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import { useState, memo } from "react";
import { useFonts } from "expo-font";
import { styles } from "../styles/LoginStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../components/uiComponents/Input";
import Button from "../../components/uiComponents/Button";

import { useLoginMutation } from "../../redux/service/loginService";
import Loading from "../../components/uiComponents/Loading";

function Login({ navigation }) {
	console.log("login re-render");
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
		SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		Light: require("../../assets/fonts/Poppins-Light.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [login, { isLoading, bug }] = useLoginMutation();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(false);

	const [isChecked, setIsChecked] = useState(false);

	const handleChecked = () => {
		setIsChecked(!isChecked);
	};

	const validate = () => {
		let check = true;
		if (!email && !password) {
			setError("Vui lòng nhập email và mật khẩu. Thử lại!");
			check = false;
		} else if (!email) {
			setError("Vui lòng nhập email. Thử lại!");
			check = false;
		} else if (!password) {
			setError("Vui lòng nhập mật khẩu. Thử lại!");
			check = false;
		}
		return check;
	};

	const handleLogin = async () => {
		if (!validate()) {
			return;
		}
		try {
			const response = await login({ email, password }).unwrap();
			if (response) {
				if (isChecked) {
					await AsyncStorage.setItem("email", email);
					await AsyncStorage.setItem("password", password);
					console.log(
						"lưu email vào bộ nhớ : ",
						await AsyncStorage.getItem("email")
					);
				} else {
					await AsyncStorage.removeItem("email");
					await AsyncStorage.removeItem("password");
				}
				console.log("login thành công", response);
			}
		} catch (error) {
			console.log("Lỗi đăng nhập : ", error);
			if (error.type === "email-not-exists") {
				setError(error.message);
			} else if (error.type === "customer-not-exists") {
				setError(error.message);
			} else if (error.type === "email-failed") {
				setError(error.message);
			} else if (error.type === "pass-failed") {
				setError(error.message);
			}
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<TouchableWithoutFeedback>
				<ScrollView>
					<StatusBar
						barStyle="light-content"
						backgroundColor="transparent"
						translucent
					/>

					<Image
						source={require("../../assets/login.png")}
						style={styles.images}
					/>

					<View style={styles.content}>
						<Text style={styles.title}>Chào mừng bạn</Text>

						<Text style={styles.subTitlte}>
							Đăng nhập tài khoản
						</Text>

						<Input
							placeholder="Nhập email hoặc số điện thoại"
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>

						<Input
							password={true}
							placeholder="Mật khẩu"
							value={password}
							onChangeText={(text) => {
								setPassword(text);
							}}
						/>

						{error && (
							<View
								style={{
									marginTop: 15,
									marginHorizontal: 25,
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

						<View style={styles.containerInfo}>
							<Pressable
								style={styles.containerCheckbox}
								onPress={handleChecked}
							>
								<Image
									source={
										!isChecked
											? require("../../assets/checkbox.png")
											: require("../../assets/checkbox-remember.png")
									}
									style={styles.iconCheckBox}
								/>
								<Text style={styles.titleRemember}>
									Nhớ tài khoản
								</Text>
							</Pressable>

							<Pressable
								onPress={() =>
									navigation.navigate("reset-pass")
								}
							>
								<Text style={styles.resetPassWord}>
									Quên mật khẩu ?
								</Text>
							</Pressable>
						</View>

						<Button title="Đăng nhập" onPress={handleLogin} />

						<View style={styles.options}>
							<View style={styles.line}></View>
							<Text
								style={{
									fontFamily: "Medium",
									marginHorizontal: 10,
								}}
							>
								Hoặc
							</Text>
							<View style={styles.line}></View>
						</View>

						<View style={styles.groupImages}>
							<TouchableOpacity activeOpacity={1}>
								<Image
									source={require("../../assets/facebook.png")}
									style={styles.logo}
								/>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={1}>
								<Image
									source={require("../../assets/google.png")}
									style={styles.logo}
								/>
							</TouchableOpacity>
						</View>

						<View>
							<Pressable
								onPress={() => navigation.navigate("register")}
							>
								<Text style={styles.titleFooter}>
									Bạn không có tài khoản ?{" "}
									<Text style={styles.createAccount}>
										Tạo tài khoản
									</Text>
								</Text>
							</Pressable>
						</View>
						<Loading visible={isLoading} />
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

export default memo(Login);
