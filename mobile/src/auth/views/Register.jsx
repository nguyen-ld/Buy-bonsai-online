import {
	View,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { styles } from "../styles/RegisterStyles";
import Input from "../../components/uiComponents/Input";
import { useState } from "react";
import Button from "../../components/uiComponents/Button";

function Register() {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
		SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		Light: require("../../assets/fonts/Poppins-Light.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

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
						<Input placeholder="Họ tên" />
						<Input placeholder="E-mail" />
						<Input placeholder="Số điện thoại" />
						<Input password={true} placeholder="Mật khẩu" />
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
						<Button title="Đăng Ký " />
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
							<Text style={styles.titleFooter}>
								Tôi đã có tài khoản ?{" "}
								<Text style={styles.createAccount}>
									Đăng nhập
								</Text>
							</Text>
						</View>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

export default Register;
