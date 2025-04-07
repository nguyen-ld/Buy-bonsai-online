import { View, Text, StatusBar, ScrollView, FlatList } from "react-native";

import * as plantServices from "../../redux/service/plantService";
import Header from "../../components/uiComponents/Header";
import { styles } from "../styles-children/stylesAccessory";
import Loading from "../../components/uiComponents/Loading";
import Products from "../../components/uiComponents/Product";

function Accessory({ navigation, route }) {
	const handleBack = () => {
		navigation.goBack();
	};

	const { data, isLoading } = plantServices.usePlantRequestQuery(
		route.params.id_danh_muc
	);

	return (
		<ScrollView style={styles.container}>
			<StatusBar backgroundColor="transparent" translucent />
			<Header
				onBack={handleBack}
				isIconLeft={true}
				isIconRight={true}
				title="phụ kiện chăm sóc"
				nameIcon="cart-outline"
			/>
			<View style={styles.containerProducts}>
				{isLoading ? (
					<Loading visible={isLoading} />
				) : (
					<FlatList
						data={data.data}
						keyExtractor={(item) => item.id_san_pham?.toString()}
						renderItem={({ item }) => <Products item={item} />}
						numColumns={2}
						scrollEnabled={false}
						columnWrapperStyle={{
							flex: 1,
							justifyContent: "space-around",
						}}
					/>
				)}
			</View>
		</ScrollView>
	);
}

export default Accessory;
