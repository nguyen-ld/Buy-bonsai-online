import { Text, View, StatusBar } from "react-native";
import Header from "../../components/uiComponents/Header";
import Checkout from "../../children-screens/ui-children/checkout";

function Notification() {
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<StatusBar backgroundColor="transparent" translucent />
			<Header title="thông báo" />
			{/* <Checkout /> */}
		</View>
	);
}

export default Notification;
