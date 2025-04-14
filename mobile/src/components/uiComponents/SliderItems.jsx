import { View, Image, Dimensions } from "react-native";
import { styles } from "../stylesComponents/stylesSliderItemsComponents";
import Animated, {
	Extrapolation,
	interpolate,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";

const width = Dimensions.get("screen").width;

function SliderItems({ item, index, scrollX }) {
	const rnAnimatedSlider = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(
						interpolate(
							scrollX.value,
							[
								(index - 1) * width,
								index * width,
								(index + 1) * width,
							],
							[0.8, 1, 0.8],
							Extrapolation.CLAMP
						),
						{
							duration: 700,
							easing: Easing.out(Easing.ease),
						}
					),
				},
			],
		};
	});

	return (
		<Animated.View style={[styles.container, rnAnimatedSlider]}>
			<Image source={{ uri: item.uri }} style={styles.image} />
		</Animated.View>
	);
}

export default SliderItems;
