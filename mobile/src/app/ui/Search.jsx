import {
	StatusBar,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";
import Header from "../../components/uiComponents/Header";
import SearchInput from "../../components/uiComponents/SearchInput";
function Search() {
	return (
		<KeyboardAvoidingView
			style={{ backgroundColor: "white", flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<StatusBar backgroundColor="transparent" translucent />
					<Header title="Tìm kiếm" isIconRight={false} />

					<SearchInput isSearch={true} />
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

export default Search;
