import {
	View,
	Image,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";
import { styles } from "../styles-children/stylesEditInformations";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as customerService from "../../redux/service/customerService";
import Header from "../../components/uiComponents/Header";
import InputData from "../../components/uiComponents/InputData";
import Button from "../../components/uiComponents/Button";

function EditInformations({ navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return null;
	}

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [images, setImages] = useState("");

	const [enable, setEnable] = useState(true);
	const [focusField, setFocusField] = useState("");

	// api

	const { data, isLoading } = customerService.useCustomerInformationQuery(2, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const [updateInfoCustomer] =
		customerService.useUpdateInfoCustomerMutation();

	useEffect(() => {
		if (data && data?.data) {
			const user = data?.data;
			setName(user?.ho_ten);
			setEmail(user?.email);
			setAddress(user?.dia_chi);
			setPhone(user?.so_dt);
			setImages(user?.hinh_anh);
		}
	}, [data]);

	// handle

	const handleBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		if (data && data.data) {
			const { ho_ten, email, dia_chi, so_dt, hinh_anh } = data.data;
			const isSame =
				ho_ten === name &&
				email === email &&
				dia_chi === address &&
				so_dt === phone &&
				hinh_anh === images;

			setEnable(isSame);
		}
	}, [name, email, address, phone, images, data]);

	const handleSave = async () => {
		try {
			const result = await updateInfoCustomer({
				id_khach_hang: 2,
				data: {
					ho_ten: name,
					email: email,
					dia_chi: address,
					so_dt: phone,
					hinh_anh: images,
				},
			});

			if (result.data.status === 200) {
				Keyboard.dismiss();
				setEnable(true);
			}

			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<Header
						isIconLeft={true}
						title="chỉnh sửa thông tin"
						onBack={handleBack}
					/>
					<View style={styles.containerProfile}>
						<Image
							source={require("../../assets/Avatar.png")}
							style={styles.imageProfile}
						/>
					</View>
					<View style={styles.body}>
						<Text style={styles.title}>
							Thông tin sẽ được lưu cho lần mua kế tiếp.
						</Text>
						<Text style={styles.title}>
							Bấm vào thông tin chi tiết để chỉnh sửa.
						</Text>

						<View style={styles.containerInput}>
							<InputData
								value={name}
								onChangeText={(text) => setName(text)}
								focus={focusField === "name"}
								onFocus={() => setFocusField("name")}
								onBlur={() => setFocusField(null)}
							/>
						</View>

						<View style={styles.containerInput}>
							<InputData
								value={email}
								onChangeText={(text) => setEmail(text)}
								focus={focusField === "email"}
								onFocus={() => setFocusField("email")}
								onBlur={() => setFocusField(null)}
							/>
						</View>

						<View style={styles.containerInput}>
							<InputData
								value={phone}
								onChangeText={(text) => {
									if (text.length <= 10) {
										setPhone(text);
									}
								}}
								focus={focusField === "phone"}
								onFocus={() => setFocusField("phone")}
								onBlur={() => setFocusField(null)}
								keyboardType="number-pad"
								maxLength={10}
							/>
						</View>

						<View style={styles.containerInput}>
							<InputData
								value={address}
								onChangeText={(text) => setAddress(text)}
								focus={focusField === "address"}
								onFocus={() => setFocusField("address")}
								onBlur={() => setFocusField(null)}
							/>
						</View>
					</View>

					<View
						style={{
							bottom: 0,
							position: "absolute",
							right: 0,
							left: 0,
						}}
					>
						<Button
							title="LƯU THÔNG TIN"
							disable={enable}
							onPress={handleSave}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

export default EditInformations;
