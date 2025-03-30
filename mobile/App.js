import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "./src/components/uiComponents/Navigation";
import Login from "./src/auth/views/Login";
import { useFonts } from "expo-font";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Register from "./src/auth/views/Register";
import ResetPassword from "./src/auth/views/ResetPassword";
import VerifyOTP from "./src/auth/views/verifyOTP";
import Loading from "./src/components/uiComponents/Loading";

const Stack = createStackNavigator();

export default function App() {
	const [fontsLoader] = useFonts({
		Medium: require("./src/assets/fonts/Poppins-Medium.ttf"),
		SemiBold: require("./src/assets/fonts/Poppins-SemiBold.ttf"),
		Light: require("./src/assets/fonts/Poppins-Light.ttf"),
	});
	if (!fontsLoader) {
		return null;
	}

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="login"
						component={Login}
						options={{ headerShown: false }}
					></Stack.Screen>
					<Stack.Screen
						name="register"
						component={Register}
						options={{ headerShown: false }}
					></Stack.Screen>
					<Stack.Screen
						name="reset-pass"
						component={ResetPassword}
						options={{
							title: false,
							headerStyle: {
								height: 70,
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="verify-otp"
						component={VerifyOTP}
						options={{
							title: false,
							headerStyle: {
								height: 70,
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="tab"
						component={Navigation}
					></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
