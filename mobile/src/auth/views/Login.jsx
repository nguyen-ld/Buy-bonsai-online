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
import { useState, memo, useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import { styles } from "../styles/LoginStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../components/uiComponents/Input";
import Button from "../../components/uiComponents/Button";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlide";

import { useLoginRequestMutation } from "../../redux/service/customerService";
import Loading from "../../components/uiComponents/Loading";

function Login({ navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [loginRequest, { isLoading }] = useLoginRequestMutation();
	const dispatch = useDispatch();

	const [inputData, setInputData] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState({
		email_phone: null,
		password: null,
	});

	const [isChecked, setIsChecked] = useState(false);

	const inputRef = useRef(null);
	const passRef = useRef(null);

	const handleChecked = () => {
		setIsChecked(!isChecked);
	};

	const validate = () => {
		let check = true;
		let newErrors = { email_phone: null, password: null };
		if (!inputData) {
			newErrors.email_phone =
				"Vui lòng nhập email hoặc số điện thoại. Thử lại!";
			inputRef.current.focus();
			check = false;
		} else if (!password) {
			newErrors.password = "Vui lòng nhập mật khẩu. Thử lại!";
			passRef.current.focus();
			check = false;
		}
		setError(newErrors);
		return check;
	};

	const handleLogin = async () => {
		if (!validate()) {
			return;
		}
		try {
			const response = await loginRequest({
				inputData,
				password,
				isChecked,
			}).unwrap();
			if (response) {
				dispatch(login({ id_user: response.data.id_khach_hang }));
				if (isChecked) {
					await AsyncStorage.setItem("data", inputData);
					await AsyncStorage.setItem("password", password);
				} else {
					await AsyncStorage.removeItem("data");
					await AsyncStorage.removeItem("password");
				}
				// setError(null);
				console.log("login thành công", response);
				navigation.navigate("tab");
			}
		} catch (error) {
			console.log("Lỗi đăng nhập : ", error);
			let newErrors = { email_phone: null, password: null };
			if (error.data.type === "invalid-input") {
				newErrors.email_phone = error.data.message;
			} else if (error.data.type === "customer-not-exists") {
				newErrors.email_phone = error.data.message;
			} else if (error.data.type === "email-mismatch") {
				newErrors.email_phone = error.data.message;
			} else if (error.data.type === "pass-failed") {
				newErrors.password = error.data.message;
			} else if (error.data.type === "phone-mismatch") {
				newErrors.email_phone = error.data.message;
			}
			setError(newErrors);
		}
	};

	useEffect(() => {
		const getDataFromAsyncStorage = async () => {
			try {
				const savedData = await AsyncStorage.getItem("data");
				const savedPassword = await AsyncStorage.getItem("password");
				if (savedData !== null && savedPassword !== null) {
					setInputData(savedData);
					setPassword(savedPassword);
					setIsChecked(true);
				}
			} catch (error) {
				console.log("Lỗi khi lấy dữ liệu:", error);
			}
		};
		getDataFromAsyncStorage();
	}, []);

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
							error={error.email_phone}
							ref={inputRef}
							placeholder="Nhập email hoặc số điện thoại"
							value={inputData}
							onChangeText={(text) => {
								setInputData(text);
								setError((prev) => ({
									...prev,
									email_phone: null,
								}));
							}}
						/>

						{error.email_phone && (
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
									{error.email_phone}
								</Text>
							</View>
						)}

						<Input
							error={error.password}
							ref={passRef}
							password={true}
							placeholder="Mật khẩu"
							value={password}
							onChangeText={(text) => {
								setPassword(text);
								setError((prev) => ({
									...prev,
									password: null,
								}));
							}}
						/>

						{error.password && (
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
									{error.password}
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
