import { ActivityIndicator, Modal, View, Text } from "react-native";

function Loading({ visible }) {
	return (
		<Modal
			visible={visible}
			style={{ flex: 1 }}
			transparent
			statusBarTranslucent
			animationType="fade"
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator color={"#ffffff"} size={32} />
				<Text style={{ flex: 0, color: "#ffffff", marginTop: 5 }}>
					Loading
				</Text>
			</View>
		</Modal>
	);
}

export default Loading;
