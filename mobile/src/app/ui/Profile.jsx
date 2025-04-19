import { Text, View, StatusBar, Image, Pressable } from "react-native";
import Header from "../../components/uiComponents/Header";
import { useFonts } from "expo-font";
import { styles } from "../stylesScreens/ProfileStyles";

function Profile({ navigation }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<StatusBar backgroundColor="transparent" translucent />
			<Header title="profile" />
			<View style={styles.containerHeader}>
				<Image source={require("../../assets/profile_view.png")} />
				<View>
					<Text style={styles.fullname}>Lê Đức Nguyên</Text>
					<Text style={styles.email}>nguyenldpd10357@gmail.com</Text>
				</View>
			</View>
			<View style={styles.containerBody}>
				<View style={styles.boxTitle}>
					<Text style={styles.title}>Chung</Text>
				</View>
				<Pressable onPress={() => navigation.navigate("edit-info")}>
					<Text style={styles.contentTitle}>Chỉnh sửa thông tin</Text>
				</Pressable>
				<Pressable>
					<Text style={styles.contentTitle}>Cẩm nang cây trồng</Text>
				</Pressable>
				<Pressable>
					<Text style={styles.contentTitle}>Lịch sử giao dịch</Text>
				</Pressable>
				<Pressable>
					<Text style={styles.contentTitle}>Q & A</Text>
				</Pressable>
				<View style={styles.boxTitle}>
					<Text style={[styles.title, styles.distance]}>
						Bảo mật & điều khoản
					</Text>
				</View>
				<Pressable>
					<Text style={styles.contentTitle}>
						Điều khoản và điều kiện
					</Text>
				</Pressable>
				<Pressable>
					<Text style={styles.contentTitle}>
						Chính sách quyền riêng tư
					</Text>
				</Pressable>
				<Pressable>
					<Text style={[styles.contentTitle, styles.logout]}>
						Đăng xuất
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

export default Profile;
