import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../app/ui/Home";
import Search from "../../app/ui/Search";
import Notification from "../../app/ui/Notifications";
import Profile from "../../app/ui/Profile";
const MyTabs = createBottomTabNavigator();

function Navigation() {
	const [fontsLoader] = useFonts({
		Medium: require("../../assets/fonts/Lato-Regular.ttf"),
		Bold: require("../../assets/fonts/Lato-Bold.ttf"),
		Light: require("../../assets/fonts/Lato-Light.ttf"),
		Thin: require("../../assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return 0;
	}

	return (
		<MyTabs.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName = "";
					if (route.name === "home") {
						iconName = focused ? "home-sharp" : "home-outline";
					} else if (route.name === "search") {
						iconName = focused ? "search" : "search-outline";
					} else if (route.name === "notification") {
						iconName = !focused
							? "notifications-outline"
							: "notifications";
					} else if (route.name === "profile") {
						iconName = !focused ? "person-outline" : "person";
					}
					return (
						<Ionicons name={iconName} size={28} color={"black"} />
					);
				},

				headerTitleStyle: {
					fontFamily: "Light",
					fontSize: 18,
				},
				headerStyle: {
					borderBottomColor: "#EEEEEE",
					borderBottomWidth: 1,
					height: 70,
				},
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 60,
				},
				tabBarItemStyle: {
					paddingVertical: 10,
				},
				headerShown: false,
			})}
		>
			<MyTabs.Screen
				name="home"
				component={Home}
				options={{ title: "Trang chủ", headerShown: false }}
			></MyTabs.Screen>
			<MyTabs.Screen
				name="search"
				component={Search}
				options={{ title: "Tìm kiếm" }}
			></MyTabs.Screen>
			<MyTabs.Screen
				name="notification"
				component={Notification}
				options={{ title: "Thông báo" }}
			></MyTabs.Screen>
			<MyTabs.Screen
				name="profile"
				component={Profile}
				options={{ title: "Thông tin cá nhân" }}
			></MyTabs.Screen>
		</MyTabs.Navigator>
	);
}

export default Navigation;
