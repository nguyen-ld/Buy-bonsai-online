import { Text, View, StatusBar } from "react-native";
import Header from "../../components/uiComponents/Header";

function Profile() {
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<StatusBar backgroundColor="transparent" translucent />
			<Header title="profile" isIconLeft={true} />
		</View>
	);
}

export default Profile;
