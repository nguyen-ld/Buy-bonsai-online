import { FlatList, StatusBar, View, Text } from "react-native";
import { styles } from "../styles-children/stylesCart";
import Header from "../../components/uiComponents/Header";
import { useFonts } from "expo-font";
import ProductItems from "../../components/uiComponents/ProductItem";
import Modals from "../../components/uiComponents/Modal";
import Checkout from "../../components/uiComponents/Checkout";
import { useDispatch, useSelector } from "react-redux";
import {
	toggleSelectedItem,
	updateQuantity,
} from "../../redux/slice/cartSlide";
import * as cartServices from "../../redux/service/cartServices";
import { useMemo, useState } from "react";

function Cart({ navigation }) {
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
	const [hide, setHide] = useState(false);
	const [hideDelItem, setHideDelItem] = useState(false);
	const [productIdSelected, setProductIdSelected] = useState(null);
	const [quantity, setQuantity] = useState(0);

	const itemSelectedList = useSelector(
		(state) => state.cartReducer.selectedItem
	);

	const dispatch = useDispatch();

	// api
	const { data, isLoading } = cartServices.useUserCartListQuery(2, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const [deleteItemInCart] = cartServices.useDeleteItemInCartMutation();

	//handle

	const handleUpdateQuantity = (so_luong, id_san_pham) => {
		setQuantity(so_luong);
		dispatch(
			updateQuantity({ id_san_pham: id_san_pham, so_luong: so_luong })
		);
	};

	const handleDeleteItemInCart = async () => {
		try {
			const response = await deleteItemInCart({
				id_khach_hang: 2,
				id_san_pham: productIdSelected,
			});
			if (response) {
				setHideDelItem(false);
				if (itemSelectedList.includes(productIdSelected)) {
					dispatch(
						toggleSelectedItem({
							id_san_pham: productIdSelected,
							so_luong: 1,
						})
					);
				}
				setProductIdSelected(null);
				console.log("delete successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelected = (
		id_san_pham,
		so_luong,
		ten_san_pham,
		gia_san_pham,
		hinh_anh,
		dac_diem
	) => {
		dispatch(
			toggleSelectedItem({
				id_san_pham: id_san_pham,
				so_luong: so_luong,
				ten_san_pham: ten_san_pham,
				gia_san_pham: gia_san_pham,
				hinh_anh: hinh_anh,
				dac_diem: dac_diem,
			})
		);
	};

	const handleClickButton = () => {
		setHide(!hide);
	};

	const handleErrorIncrements = () => {};

	const handleErrorDecrement = (id_san_pham, so_luong) => {
		setHideDelItem(!hideDelItem);
		setProductIdSelected(id_san_pham);
		dispatch(
			toggleSelectedItem({ id_san_pham: id_san_pham, so_luong: so_luong })
		);
	};

	const handleClickDeleteItem = (id_san_pham, so_luong) => {
		setProductIdSelected(id_san_pham);
		setHideDelItem(!hideDelItem);
		dispatch(
			toggleSelectedItem({ id_san_pham: id_san_pham, so_luong: so_luong })
		);
	};

	const handleCloseDel = () => {
		setHideDelItem(!hideDelItem);
		if (
			productIdSelected &&
			itemSelectedList.some((i) => i.id_san_pham === productIdSelected)
		) {
			dispatch(
				toggleSelectedItem({
					id_san_pham: productIdSelected,
					so_luong: quantity,
				})
			);
		}
		setProductIdSelected(null);
	};

	const handelBack = () => {
		navigation.goBack();
	};

	const total = useMemo(() => {
		if (data && data.data) {
			return itemSelectedList.reduce((sum, selectedItem) => {
				const matchedItem = data.data.find(
					(item) =>
						item.san_pham.id_san_pham === selectedItem.id_san_pham
				);

				if (matchedItem) {
					const price = matchedItem.san_pham.gia_san_pham;
					return sum + price * selectedItem.so_luong;
				}
				return sum;
			}, 0);
		}
		return 0;
	}, [data, itemSelectedList]);

	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor="transparent"
				translucent
				barStyle="dark-content"
			/>

			<Header
				isIconLeft={true}
				title="GIỎ HÀNG"
				isIconRight={data?.data?.length > 0}
				nameIcon="trash-outline"
				onPress={handleClickButton}
				onBack={handelBack}
			/>

			<View>
				{!isLoading &&
					(data.data.length > 0 ? (
						<FlatList
							data={data.data}
							renderItem={({ item }) => (
								<ProductItems
									item={item}
									onDelete={handleClickDeleteItem}
									onToggleSelected={handleSelected}
									onDecrements={handleErrorDecrement}
									isChecked={true}
									isPrice={true}
									mode="edit"
									onChangeQuantity={handleUpdateQuantity}
								/>
							)}
							keyExtractor={(item) => item.id_chi_tiet_gio_hang}
						/>
					) : (
						<View style={styles.containerEmpty}>
							<Text style={styles.cartEmpty}>
								Giỏ hàng hiện tại đang trống !
							</Text>
						</View>
					))}
			</View>

			<Modals
				show={hide}
				onClose={() => setHide(!hide)}
				onCofirm={() => console.log("click delete")}
				title="Xác nhận xóa tất cả đơn hàng?"
				descriptions="Thao tác này sẽ không thể khôi phục"
			/>
			<Modals
				show={hideDelItem}
				onClose={handleCloseDel}
				onCofirm={handleDeleteItemInCart}
				title="Xác nhận xóa đơn hàng?"
				descriptions="Thao tác này sẽ không thể khôi phục"
			/>

			{itemSelectedList.length > 0 && (
				<Checkout
					totalPrice={total}
					onPress={() =>
						navigation.navigate("checkout", { totalCart: total })
					}
				/>
			)}
		</View>
	);
}

export default Cart;
