import { Text, View, StatusBar } from "react-native";
import Header from "../../components/uiComponents/Header";

function Notification() {
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<StatusBar backgroundColor="transparent" translucent />
			<Header title="thông báo" />
		</View>
	);
}

export default Notification;
