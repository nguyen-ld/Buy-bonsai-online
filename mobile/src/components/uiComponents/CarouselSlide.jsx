import { FlatList, Image, View, Dimensions, Pressable } from "react-native";
import { styles } from "../stylesComponents/stylesCarouselSliderComponents";
import SliderItems from "./SliderItems";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { useState, useRef } from "react";

function CarouselSlide({ item }) {
	const ImagesList = [
		{
			id: 1,
			uri: item,
		},
		{
			id: 2,
			uri: item,
		},
		{
			id: 3,
			uri: item,
		},
	];

	const scrollX = useSharedValue(0);

	const [currentIndex, setCurrentIndex] = useState(0);

	const onScrollHandler = useAnimatedScrollHandler({
		onScroll: (e) => {
			scrollX.value = e.contentOffset.x;
		},
	});
	const onViewableItemsChanged = ({ viewableItems }) => {
		if (
			viewableItems[0].index !== undefined &&
			viewableItems[0].index !== null
		) {
			const index = viewableItems[0].index;
			setCurrentIndex(index);
		}
	};

	const flatListRef = useRef(null);

	const handleGoToPrev = () => {
		if (currentIndex > 0) {
			flatListRef?.current?.scrollToIndex({
				index: currentIndex - 1,
				animated: true,
			});
		}
	};

	const handleGoToNext = () => {
		if (currentIndex < ImagesList.length - 1) {
			flatListRef?.current?.scrollToIndex({
				index: currentIndex + 1,
				animated: true,
			});
		} else {
			flatListRef?.current?.scrollToIndex({ index: 0 });
		}
	};

	const viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 10,
	};

	const viewabilityConfigCallbackPairs = useRef([
		{ viewabilityConfig, onViewableItemsChanged: onViewableItemsChanged },
	]);

	return (
		<View style={styles.container}>
			<Animated.FlatList
				ref={flatListRef}
				data={ImagesList}
				renderItem={({ item, index }) => (
					<SliderItems item={item} index={index} scrollX={scrollX} />
				)}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={onScrollHandler}
				viewabilityConfigCallbackPairs={
					viewabilityConfigCallbackPairs.current
				}
			/>
			{/* dot indicator */}
			<View style={styles.containerDot}>
				{ImagesList.map((_, index) => {
					return (
						<View
							key={index}
							style={[
								styles.dot,
								{
									backgroundColor:
										currentIndex === index
											? "#221F1F"
											: "#ABABAB",
								},
							]}
						></View>
					);
				})}
			</View>
			{/* prev/next */}

			<View style={styles.containerMove}>
				<Pressable onPress={handleGoToPrev}>
					<Image
						source={require("../../assets/chevron-left.png")}
						style={styles.prev}
					/>
				</Pressable>

				<Pressable onPress={handleGoToNext}>
					<Image
						source={require("../../assets/chevron-right.png")}
						style={styles.next}
					/>
				</Pressable>
			</View>
		</View>
	);
}

export default CarouselSlide;
