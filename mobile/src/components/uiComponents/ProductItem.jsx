import { Pressable, View, Image, Text } from "react-native";
import { styles } from "../stylesComponents/stylesProductItemComponents";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";

function ProducItems({
	onToggleSelected,
	item,
	onChangeQuantity,
	onDelete,
	onDecrements,
	mode, // 'edit', 'order', 'success'
	isChecked,
	isPrice,
	orderQuantity,
}) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) return null;

	const [quantity, setQuantity] = useState(item?.so_luong);

	const productDetail = item.san_pham || item;

	const isCheck = useSelector((state) =>
		state.cartReducer.selectedItem.some(
			(i) => i.id_san_pham === item?.san_pham?.id_san_pham
		)
	);

	const handleIncrement = () => {
		if (quantity < 5) {
			const newQty = quantity + 1;
			setQuantity(newQty);
			onChangeQuantity?.(newQty, item.san_pham.id_san_pham);
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			const newQty = quantity - 1;
			setQuantity(newQty);
			onChangeQuantity?.(newQty, item.san_pham.id_san_pham);
		} else {
			onDecrements?.(item.san_pham.id_san_pham, quantity);
		}
	};

	const handleCheck = () => {
		onToggleSelected?.(
			item.san_pham.id_san_pham,
			quantity,
			item.san_pham.ten_san_pham,
			item.san_pham.gia_san_pham,
			item.san_pham.hinh_anh,
			productDetail.chi_tiet_cay_trongs[0]?.dac_diem
		);
	};

	const handleDelete = () => {
		onDelete?.(item.san_pham.id_san_pham, quantity);
	};

	return (
		<View style={styles.container}>
			<View style={styles.containerItems}>
				{isChecked && (
					<Pressable onPress={handleCheck}>
						<Image
							source={
								isCheck
									? require("../../assets/uncheck.png")
									: require("../../assets/check.png")
							}
						/>
					</Pressable>
				)}

				<View style={styles.blockProducts}>
					<Image
						source={{ uri: productDetail.hinh_anh }}
						style={styles.imageProduct}
					/>
					<View style={styles.infoProducts}>
						{mode === "success" ? (
							<Text style={styles.success}>
								Đặt hàng thành công
							</Text>
						) : (
							<View style={styles.properties}>
								<Text style={styles.nameProduct}>
									{productDetail.ten_san_pham}
								</Text>
								{(productDetail.chi_tiet_cay_trongs?.[0]
									?.dac_diem ||
									productDetail?.dac_diem) && (
									<Text style={styles.characteristic}>
										{" | "}
										{productDetail.chi_tiet_cay_trongs?.[0]
											?.dac_diem ||
											productDetail?.dac_diem}
									</Text>
								)}
							</View>
						)}

						{isPrice && (
							<Text style={styles.priceCart}>
								{productDetail.gia_san_pham.toLocaleString()}đ
							</Text>
						)}

						{mode === "edit" && (
							<View style={styles.changeCart}>
								<View style={styles.boxChangeQuantity}>
									<Pressable onPress={handleDecrement}>
										<Image
											source={require("../../assets/minus-square.png")}
											style={styles.minus}
										/>
									</Pressable>
									<Text style={styles.quantity}>
										{quantity}
									</Text>
									<Pressable onPress={handleIncrement}>
										<Image
											source={require("../../assets/plus-square.png")}
											style={styles.plus}
										/>
									</Pressable>
								</View>
								<Pressable onPress={handleDelete}>
									<Text style={styles.delete}>Xóa</Text>
								</Pressable>
							</View>
						)}

						{mode === "order" && (
							<Text style={styles.quantityProducts}>
								{orderQuantity} sản phẩm
							</Text>
						)}

						{!mode && (
							<Text style={styles.quantityProducts}>
								Còn 156 sp
							</Text>
						)}
					</View>
				</View>
			</View>
		</View>
	);
}

export default ProducItems;
