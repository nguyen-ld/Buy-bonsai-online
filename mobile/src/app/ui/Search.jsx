import { StatusBar, View } from "react-native";
import Header from "../../components/uiComponents/Header";
function Search() {
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<StatusBar backgroundColor="transparent" translucent />
			<Header title="Tìm kiếm" isIconLeft={true} isIconRight={false} />
		</View>
	);
}

export default Search;
