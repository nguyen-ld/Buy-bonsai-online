import { View, Text, Modal, StatusBar, Pressable } from "react-native";
import { styles } from "../stylesComponents/stylesModalComponents";
import Button from "./Button";
import { useFonts } from "expo-font";

function Modals({ show, onClose, onCofirm, title, descriptions }) {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	return (
		<Modal visible={show} animationType="fade" transparent={true}>
			<StatusBar
				backgroundColor="rgba(236, 236, 236, 0.6)"
				barStyle="dark-content"
				translucent={true}
			/>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<View style={styles.body}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.content}>{descriptions}</Text>
						<View style={styles.btnConfirm}>
							<Button title="Đồng ý" onPress={onCofirm} />
						</View>
						<Pressable onPress={onClose}>
							<Text style={styles.cancel}>Hủy bỏ</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}

export default Modals;
