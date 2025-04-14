import { Pressable, View, Image, Text } from "react-native";
import { styles } from "../stylesComponents/stylesCartItemComponents";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";

function CartItems({
	onToggleSelected,
	item,
	onChangeQuantity,
	onDelete,
	onDecrements,
}) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	const [quantity, setQuantity] = useState(item.so_luong);

	const isCheck = useSelector((state) =>
		state.cartReducer.selectedItem.includes(item.san_pham.id_san_pham)
	);

	const handleIncrementQuantity = () => {
		if (quantity < 5) {
			const newQuantity = quantity + 1;
			setQuantity(newQuantity);
			onChangeQuantity && onChangeQuantity(newQuantity);
		} else {
		}
	};

	const handleDecrementQuantity = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			onChangeQuantity && onChangeQuantity(newQuantity);
		} else {
			onDecrements(item.san_pham.id_san_pham);
		}
	};

	const handleCheck = () => {
		onToggleSelected(item.san_pham.id_san_pham);
	};

	const seletedItem = () => {
		onDelete(item.san_pham.id_san_pham);
	};

	return (
		<View style={styles.container}>
			<View style={styles.containerItems}>
				<Pressable onPress={handleCheck}>
					<Image
						source={
							isCheck
								? require("../../assets/uncheck.png")
								: require("../../assets/check.png")
						}
					/>
				</Pressable>
				<View>
					<View style={styles.blockProducts}>
						<Image
							source={{ uri: item.san_pham.hinh_anh }}
							style={styles.imageProduct}
						/>
						<View style={styles.infoProducts}>
							<View style={styles.properties}>
								<Text style={styles.nameProduct}>
									{item.san_pham.ten_san_pham}
								</Text>
								{item.san_pham.chi_tiet_cay_trongs &&
									item.san_pham.chi_tiet_cay_trongs.length >
										0 &&
									item.san_pham.chi_tiet_cay_trongs[0]
										?.dac_diem && (
										<Text style={styles.characteristic}>
											{" | "}
											{
												item.san_pham
													.chi_tiet_cay_trongs[0]
													.dac_diem
											}
										</Text>
									)}
							</View>
							<Text style={styles.priceCart}>
								{item.san_pham.gia_san_pham.toLocaleString()}đ
							</Text>
							<View style={styles.changeCart}>
								<View style={styles.boxChangeQuantity}>
									<Pressable
										onPress={handleDecrementQuantity}
									>
										<Image
											source={require("../../assets/minus-square.png")}
											style={styles.minus}
										/>
									</Pressable>
									<Text style={styles.quantity}>
										{quantity}
									</Text>
									<Pressable
										onPress={handleIncrementQuantity}
									>
										<Image
											source={require("../../assets/plus-square.png")}
											style={styles.plus}
										/>
									</Pressable>
								</View>
								<Pressable onPress={seletedItem}>
									<Text style={styles.delete}>Xóa</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

export default CartItems;
