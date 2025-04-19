import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { styles } from "../styles-children/stylesCheckout";
import { useFonts } from "expo-font";
import InputData from "../../components/uiComponents/InputData";
import Method from "../../components/uiComponents/Method";
import * as methodServices from "../../redux/service/methodServices";
import * as customerServices from "../../redux/service/customerService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setSelectedPayment,
	setSelectedShipping,
} from "../../redux/slice/methodSlide";
import ConfirmCheckout from "../../components/uiComponents/ConfirmCheckout";
import Header from "../../components/uiComponents/Header";
import ProducItems from "../../components/uiComponents/ProductItem";

function Checkout({ navigation, route }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	// api
	const { data: payMethodData, isLoading: isPayMethodLoading } =
		methodServices.useGetPayMethodQuery();

	const { data: shippingMethodData, isLoading: isShippingMethodLoading } =
		methodServices.useGetShippingMethodQuery();

	const { data: userInformationData, isLoading: isUserInformationLoading } =
		customerServices.useCustomerInformationQuery(2);

	// state
	const dispatch = useDispatch();
	const selectedShipping = useSelector(
		(state) => state.methodReducer.selectedShippingId
	);
	const selectedPayment = useSelector(
		(state) => state.methodReducer.selectedPaymentId
	);

	const handlePaymentCheck = (id) => {
		dispatch(setSelectedPayment(id));
	};

	const handleShippingCheck = (id, price) => {
		dispatch(setSelectedShipping(id, price));
	};

	const handleBack = () => {
		navigation.navigate("cart");
	};

	const [fullName, setFullName] = useState(null);
	const [email, setEmail] = useState(null);
	const [address, setAddress] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState(null);

	useEffect(() => {
		if (userInformationData && userInformationData.data) {
			const data = userInformationData.data;
			setFullName(data.ho_ten);
			setEmail(data.email);
			setPhoneNumber(data.so_dt);
		}
	}, [userInformationData]);

	const [error, setError] = useState({
		full_name: null,
		email: null,
		address: null,
		number_phone: null,
	});
	const [focusField, setFocusField] = useState(null);
	const [editInfo, setEditInfo] = useState(false);

	const validateForm = () => {
		let check = true;
		const newError = {
			full_name: null,
			email: null,
			address: null,
			number_phone: null,
		};
		if (!fullName) {
			check = false;
			newError.full_name = "Vui lòng nhập họ và tên";
		} else if (!email) {
			check = false;
			newError.email = "Vui lòng nhập email";
		} else if (!address) {
			check = false;
			newError.address = "Vui lòng nhập địa chỉ";
		} else if (!phoneNumber) {
			check = false;
			newError.number_phone = "Vui lòng nhập số điện thoại ";
		}

		setError(newError);
		return check;
	};

	// order
	const orderList = useSelector((state) => state.cartReducer.selectedItem);

	// shiping cost

	return (
		<View style={styles.container}>
			<Header title="THANH TOÁN" isIconLeft={true} onBack={handleBack} />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={{ flex: 1, marginTop: 5 }}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={styles.containerScroll}
				>
					{editInfo ? (
						<View>
							<View style={styles.containerEdit}>
								<Text style={styles.titleCustomerEdit}>
									Thông tin khách hàng
								</Text>
								<Pressable
									onPress={() => setEditInfo(!editInfo)}
								>
									<Text style={styles.edit}>Chỉnh sửa</Text>
								</Pressable>
							</View>
							<View>
								<Text style={styles.itemEdit}>{fullName}</Text>
								<Text style={styles.itemEdit}>{email}</Text>
								<Text style={styles.itemEdit}>{address}</Text>
								<Text style={styles.itemEdit}>
									{phoneNumber}
								</Text>
							</View>
						</View>
					) : (
						<>
							<Text style={styles.titleCustomer}>
								Thông tin khách hàng
							</Text>
							<View style={styles.containerInput}>
								<InputData
									value={fullName}
									onChangeText={(text) => {
										setFullName(text);
									}}
									error={error}
									focus={focusField === "full-name"}
									onFocus={() => setFocusField("full-name")}
									onBlur={() => setFocusField(null)}
								/>
							</View>
							<View style={styles.containerInput}>
								<InputData
									value={email}
									onChangeText={(text) => {
										setEmail(text);
									}}
									error={error}
									focus={focusField === "email"}
									onFocus={() => setFocusField("email")}
									onBlur={() => setFocusField(null)}
								/>
							</View>
							<View style={styles.containerInput}>
								<InputData
									value={address}
									onChangeText={(text) => {
										setAddress(text);
									}}
									error={error}
									focus={focusField === "address"}
									onFocus={() => setFocusField("address")}
									onBlur={() => setFocusField(null)}
								/>
							</View>
							<View style={styles.containerInput}>
								<InputData
									value={phoneNumber}
									onChangeText={(text) => {
										if (text.length <= 10) {
											setPhoneNumber(text);
										}
									}}
									error={error}
									focus={focusField === "number-phone"}
									onFocus={() =>
										setFocusField("number-phone")
									}
									onBlur={() => setFocusField(null)}
									keyboardType="phone-pad"
								/>
							</View>
						</>
					)}
					<Text style={styles.titleMethod}>
						Phương thức vận chuyển
					</Text>
					{!isShippingMethodLoading ? (
						shippingMethodData.data.map((item) => (
							<Method
								key={item.id_pt_van_chuyen}
								item={item}
								isPrice={true}
								isDate={true}
								onCheck={() =>
									handleShippingCheck({
										id: item.id_pt_van_chuyen,
										price: item.gia_phuong_thuc,
									})
								}
								isSelected={
									item.id_pt_van_chuyen ===
									selectedShipping.id
								}
							/>
						))
					) : (
						<View style={{ marginTop: 20 }}>
							<ActivityIndicator size="large" color="#007537" />
						</View>
					)}
					<Text style={styles.titleMethod}>Hình thức thanh toán</Text>
					{!isPayMethodLoading ? (
						payMethodData.data.map((item) => (
							<Method
								key={item.id_pt_thanh_toan}
								item={item}
								isPrice={false}
								isDate={false}
								onCheck={() =>
									handlePaymentCheck(item.id_pt_thanh_toan)
								}
								isSelected={
									item.id_pt_thanh_toan === selectedPayment
								}
							/>
						))
					) : (
						<View style={{ marginTop: 20 }}>
							<ActivityIndicator size="large" color="#007537" />
						</View>
					)}
					<Text style={styles.titleMethod}>Đơn hàng đã chọn</Text>
					{orderList.map((item, index) => {
						return (
							<View style={styles.orderItem}>
								<ProducItems
									item={item}
									isPrice={true}
									key={index}
									mode="order"
									orderQuantity={item.so_luong}
								/>
							</View>
						);
					})}
				</ScrollView>
			</KeyboardAvoidingView>

			<ConfirmCheckout
				total={route.params?.totalCart}
				shipping={selectedShipping.price}
			/>
		</View>
	);
}

export default Checkout;
