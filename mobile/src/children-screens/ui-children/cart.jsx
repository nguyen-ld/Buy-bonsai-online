import { FlatList, StatusBar, View, Text } from "react-native";
import { styles } from "../styles-children/stylesCart";
import Header from "../../components/uiComponents/Header";
import { useFonts } from "expo-font";
import CartItems from "../../components/uiComponents/ItemCarts";
import Modals from "../../components/uiComponents/Modal";
import Checkout from "../../components/uiComponents/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectedItem } from "../../redux/slice/cartSlide";
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

	const itemSelectedList = useSelector(
		(state) => state.cartReducer.selectedItem
	);

	const dispatch = useDispatch();

	// api
	const { data, isLoading } = cartServices.useUserCartListQuery(2, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const [changeQuantity] = cartServices.useChangeQuantityMutation();

	const [deleteItemInCart] = cartServices.useDeleteItemInCartMutation();

	//handle

	const handleUpdateQuantity = async (id_san_pham, newQty) => {
		try {
			await changeQuantity({
				id_khach_hang: 2,
				id_san_pham: id_san_pham,
				quantity: newQty,
			}).unwrap();
		} catch (error) {
			console.log(error);
		}
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
					dispatch(toggleSelectedItem(productIdSelected));
				}
				setProductIdSelected(null);
				console.log("delete successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelected = (id) => {
		dispatch(toggleSelectedItem(id));
	};

	const handleClickButton = () => {
		setHide(!hide);
	};

	const handleErrorIncrements = () => {};

	const handleErrorDecrement = (productId) => {
		setHideDelItem(!hideDelItem);
		setProductIdSelected(productId);
		dispatch(toggleSelectedItem(productId));
	};

	const handleClickDeleteItem = (productId) => {
		setProductIdSelected(productId);
		setHideDelItem(!hideDelItem);
		dispatch(toggleSelectedItem(productId));
	};

	const handleCloseDel = () => {
		setHideDelItem(!hideDelItem);
		if (productIdSelected && itemSelectedList.includes(productIdSelected)) {
			dispatch(toggleSelectedItem(productIdSelected));
		}
		setProductIdSelected(null);
	};

	const handelBack = () => {
		navigation.goBack();
	};

	const total = useMemo(() => {
		if (data && data.data) {
			return data.data
				.filter((item) =>
					itemSelectedList.includes(item.san_pham.id_san_pham)
				)
				.reduce((sum, item) => {
					return sum + item.tong_tien;
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
								<CartItems
									item={item}
									onDelete={handleClickDeleteItem}
									onToggleSelected={handleSelected}
									onDecrements={handleErrorDecrement}
									onChangeQuantity={(newQty) => {
										handleUpdateQuantity(
											item.san_pham.id_san_pham,
											newQty
										);
									}}
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

			{itemSelectedList.length > 0 && <Checkout totalPrice={total} />}
		</View>
	);
}

export default Cart;
