import {
	View,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { useState, useRef } from "react";
import { useCreateAccountRequestMutation } from "../../redux/service/customerService";
import { styles } from "../styles/RegisterStyles";

import Input from "../../components/uiComponents/Input";
import Button from "../../components/uiComponents/Button";
import Loading from "../../components/uiComponents/Loading";

function Register({ navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [ho_ten, setHoTen] = useState(null);
	const [email, setEmail] = useState(null);
	const [so_dt, setSoDt] = useState(null);
	const [mat_khau, setMatKhau] = useState(null);
	const [error, setError] = useState({
		ho_ten: null,
		email: null,
		so_dt: null,
		mat_khau: null,
	});

	const hoTenRef = useRef(null);
	const emailRef = useRef(null);
	const soDtRef = useRef(null);
	const matKhauRef = useRef(null);

	const validate = () => {
		let check = true;
		let newErrors = {
			ho_ten: null,
			email: null,
			so_dt: null,
			mat_khau: null,
		};

		if (!ho_ten) {
			newErrors.ho_ten = "Vui lòng nhập họ và tên.";
			hoTenRef.current?.focus();
			check = false;
		} else if (!email) {
			newErrors.email = "Vui lòng nhập email.";
			emailRef.current?.focus();
			check = false;
		} else if (!so_dt) {
			newErrors.so_dt = "Vui lòng nhập số điện thoại.";
			soDtRef.current?.focus();
			check = false;
		} else if (!mat_khau) {
			newErrors.mat_khau = "Vui lòng nhập mật khẩu.";
			matKhauRef.current?.focus();
			check = false;
		}

		setError(newErrors);
		return check;
	};

	const [createAccountRequest, { isLoading }] =
		useCreateAccountRequestMutation();

	const handleCreateAccount = async () => {
		if (!validate()) {
			return;
		}
		try {
			const response = await createAccountRequest({
				email,
				ho_ten,
				so_dt,
				mat_khau,
			}).unwrap();

			if (response.status === 200) {
				console.log("tạo tài khoản thành công");
				setError(null);
				navigation.navigate("login");
			}
		} catch (error) {
			console.log(error);
			let newErrors = {
				ho_ten: null,
				email: null,
				so_dt: null,
				mat_khau: null,
			};

			if (error.data.type === "email-failed") {
				newErrors.email = error.data.message;
			} else if (error.data.type === "phone-failed") {
				newErrors.so_dt = error.data.message;
			} else if (
				error.data.type === "pass-length" ||
				error.data.type === "pass-special"
			) {
				newErrors.mat_khau = error.data.message;
			} else if (error.data.type === "name-failed") {
				newErrors.ho_ten = error.data.message;
			} else if (error.data.type === "email-exists") {
				newErrors.email = error.data.message;
			}

			setError(newErrors);
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<TouchableWithoutFeedback>
				<ScrollView>
					<Image
						source={require("../../assets/register.png")}
						style={styles.images}
					/>
					<View style={styles.content}>
						<Text style={styles.title}>Đăng ký</Text>
						<Text style={styles.subTitlte}>Tạo tài khoản</Text>
						<Input
							ref={hoTenRef}
							error={error.ho_ten}
							placeholder="Họ tên"
							value={ho_ten}
							onChangeText={(text) => {
								setHoTen(text);
								setError((prev) => ({
									...prev,
									ho_ten: null,
								}));
							}}
						/>
						{error.ho_ten && (
							<View style={styles.containerBug}>
								<Text style={styles.bug}>{error.ho_ten}</Text>
							</View>
						)}
						<Input
							ref={emailRef}
							error={error.email}
							placeholder="E-mail"
							value={email}
							onChangeText={(text) => {
								setEmail(text);
								setError((prev) => ({ ...prev, email: null }));
							}}
						/>
						{error.email && (
							<View style={styles.containerBug}>
								<Text style={styles.bug}>{error.email}</Text>
							</View>
						)}
						<Input
							ref={soDtRef}
							error={error.so_dt}
							placeholder="Số điện thoại"
							value={so_dt}
							onChangeText={(text) => {
								setSoDt(text);
								setError((prev) => ({ ...prev, so_dt: null }));
							}}
						/>
						{error.so_dt && (
							<View style={styles.containerBug}>
								<Text style={styles.bug}>{error.so_dt}</Text>
							</View>
						)}
						<Input
							ref={matKhauRef}
							error={error.mat_khau}
							password={true}
							placeholder="Mật khẩu"
							value={mat_khau}
							onChangeText={(text) => {
								setMatKhau(text);
								setError((prev) => ({
									...prev,
									mat_khau: null,
								}));
							}}
						/>

						{error.mat_khau && (
							<View style={styles.containerBug}>
								<Text style={styles.bug}>{error.mat_khau}</Text>
							</View>
						)}

						<View style={styles.containerConditional}>
							<Text style={styles.info}>
								Để đăng ký tài khoản, bạn đồng ý{" "}
								<Text style={styles.conditional}>
									Terms & Conditions{" "}
								</Text>{" "}
								and{" "}
								<Text style={styles.conditional}>
									Privacy Policy
								</Text>
							</Text>
						</View>
						<Button
							title="Đăng Ký "
							onPress={handleCreateAccount}
						/>
						<View style={styles.options}>
							<View style={styles.line}></View>
							<Text
								style={{
									fontFamily: "Medium",
									marginHorizontal: 10,
									fontSize: 16,
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
								onPress={() => navigation.navigate("login")}
							>
								<Text style={styles.titleFooter}>
									Tôi đã có tài khoản ?{" "}
									<Text style={styles.createAccount}>
										Đăng nhập
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

export default Register;
