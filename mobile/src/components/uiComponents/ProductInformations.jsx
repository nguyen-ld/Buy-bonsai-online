import { Text, View } from "react-native";
import { styles } from "../stylesComponents/stylesProductInformationsComponents";
import { useFonts } from "expo-font";

function ProductInformations({ item }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	console.log("product-informations : ", item.id_danh_muc);

	const renderProductDetails = () => {
		switch (item.id_danh_muc) {
			case 1:
				return (
					<View style={styles.containerItemInfo}>
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Kích cỡ</Text>
							<Text style={styles.value}>
								{item?.chi_tiet_cay_trongs[0]?.size}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Xuất xứ</Text>
							<Text style={styles.value}>
								{item?.chi_tiet_cay_trongs[0]?.xuat_xu}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Tình trạng</Text>
							<Text style={[styles.value, styles.valueQuantity]}>
								Còn {item?.kho_san_phams[0]?.tinh_trang} sp
							</Text>
						</View>
						<View style={styles.lineItem} />
					</View>
				);

			case 2:
				return (
					<View style={styles.containerItemInfo}>
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Màu sắc</Text>
							<Text style={styles.value}>
								{item.chi_tiet_chau_cays[0].mau_sac}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Chiều cao</Text>
							<Text style={styles.value}>
								{item.chi_tiet_chau_cays[0].chieu_cao} cm
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Trọng lượng</Text>
							<Text style={styles.value}>
								{item.chi_tiet_chau_cays[0].trong_luong} g
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Chất liệu</Text>
							<Text style={styles.value}>
								{item.chi_tiet_chau_cays[0].chat_lieu}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Đường kính</Text>
							<Text style={styles.value}>
								{item.chi_tiet_chau_cays[0].duong_kinh} cm
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Hình dáng</Text>
							<Text style={styles.value}>
								{item.chi_tiet_chau_cays[0].hinh_dang}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Lỗ thoát nước</Text>
							{item.chi_tiet_chau_cays[0].lo_thoat_nuoc === 1 ? (
								<Text style={styles.value}>Có</Text>
							) : (
								<Text style={styles.value}>Không</Text>
							)}
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Tình trạng</Text>
							<Text style={[styles.value, styles.valueQuantity]}>
								Còn {item.kho_san_phams[0].tinh_trang} sp
							</Text>
						</View>
						<View style={styles.lineItem} />
					</View>
				);
			case 3:
				return (
					<View style={styles.containerItemInfo}>
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Loại phụ kiện</Text>
							<Text style={styles.value}>
								{item?.chi_tiet_phu_kiens[0]?.loai_phu_kien}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={[styles.itemInfo, styles.titleUse]}>
							<Text style={[styles.subTilte, styles.subTitleUse]}>
								Hướng dẫn sử dụng
							</Text>
							<Text style={[styles.value, styles.use]}>
								{item?.chi_tiet_phu_kiens[0]?.huong_dan_su_dung}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Kích thước</Text>
							<Text style={styles.value}>
								{item?.chi_tiet_phu_kiens[0]?.kich_thuoc} cm
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Chất liệu</Text>
							<Text style={styles.value}>
								{item?.chi_tiet_phu_kiens[0]?.chat_lieu}
							</Text>
						</View>
						<View style={styles.lineItem} />
						<View style={styles.itemInfo}>
							<Text style={styles.subTilte}>Tình trạng</Text>
							<Text style={[styles.value, styles.valueQuantity]}>
								Còn {item?.kho_san_phams[0]?.tinh_trang} sp
							</Text>
						</View>
						<View style={styles.lineItem} />
					</View>
				);
			default:
				return (
					<Text style={styles.value}>
						Không có thông tin chi tiết.
					</Text>
				);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.priceProduct}>
				{item.gia_san_pham.toLocaleString()}đ
			</Text>
			<Text style={styles.title}>Chi tiết sản phẩm</Text>
			<View style={styles.line} />
			{renderProductDetails()}
		</View>
	);
}

export default ProductInformations;
