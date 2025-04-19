import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Navigation from "./src/components/uiComponents/Navigation";
import Login from "./src/auth/views/Login";
import Register from "./src/auth/views/Register";
import ResetPassword from "./src/auth/views/ResetPassword";
import VerifyOTP from "./src/auth/views/verifyOTP";
import Plant from "./src/children-screens/ui-children/plant";
import PottedPlant from "./src/children-screens/ui-children/potted-plant";
import Accessory from "./src/children-screens/ui-children/accessory";
import ProductsDetails from "./src/children-screens/ui-children/products-details";
import Cart from "./src/children-screens/ui-children/cart";
import EditInformations from "./src/children-screens/ui-children/edit-informations";
import Checkout from "./src/children-screens/ui-children/checkout";
import ChangePassword from "./src/auth/views/ChangePassword";
import UserProvider from "./src/redux/context/contextApi";

const Stack = createStackNavigator();

export default function App() {
	const [fontsLoader] = useFonts({
		Medium: require("./src/assets/fonts/Lato-Regular.ttf"),
		Bold: require("./src/assets/fonts/Lato-Bold.ttf"),
		Light: require("./src/assets/fonts/Lato-Light.ttf"),
		Thin: require("./src/assets/fonts/Lato-Thin.ttf"),
	});
	if (!fontsLoader) {
		return null;
	}

	return (
		<Provider store={store}>
			<UserProvider>
				<NavigationContainer>
					<Stack.Navigator>
						{/* <Stack.Screen
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
									height: 60,
									elevation: 0,
								},
							}}
						></Stack.Screen>
						<Stack.Screen
							name="verify-otp"
							component={VerifyOTP}
							options={{
								title: false,
								headerStyle: {
									height: 60,
									elevation: 0,
								},
							}}
						></Stack.Screen>
						<Stack.Screen
							name="change-password"
							component={ChangePassword}
							options={{
								title: false,
								headerStyle: {
									height: 60,
									elevation: 0,
								},
							}}
						></Stack.Screen> */}
						<Stack.Screen
							name="tab"
							component={Navigation}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
						<Stack.Screen
							name="plant"
							component={Plant}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
						<Stack.Screen
							name="potted_plant"
							component={PottedPlant}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
						<Stack.Screen
							name="accessory"
							component={Accessory}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>

						<Stack.Screen
							name="products-details"
							component={ProductsDetails}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
						<Stack.Screen
							name="cart"
							component={Cart}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
						<Stack.Screen
							name="edit-info"
							component={EditInformations}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
						<Stack.Screen
							name="checkout"
							component={Checkout}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
			</UserProvider>
		</Provider>
	);
}
