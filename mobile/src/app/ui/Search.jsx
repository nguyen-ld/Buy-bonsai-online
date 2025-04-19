import {
	StatusBar,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	FlatList,
	Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/uiComponents/Header";
import InputData from "../../components/uiComponents/InputData";
import HistorySearch from "../../components/uiComponents/HistorySearch";
import { styles } from "../stylesScreens/SearchStyles";
import { useEffect, useState } from "react";
import ProducItems from "../../components/uiComponents/ProductItem";
import * as productServices from "../../redux/service/productService";
function Search() {
	const [searchInput, setSearchInput] = useState(null);
	const [recentKeyWord, setRecentKeyWord] = useState([]);
	const [resultSearch, setResultSearch] = useState([]);
	const [error, setError] = useState(null);
	const [callEffect, setCallEffect] = useState(false);
	const [notFound, setNotFound] = useState(null);
	const [searchPoduct, { isLoading }] =
		productServices.useSearchPoductMutation();

	const saveSearchKeyWord = async (keyword) => {
		try {
			// get data
			const existing = await AsyncStorage.getItem("recentSearch");
			// array key word
			let searches = existing ? JSON.parse(existing) : [];
			//check existing

			searches = searches.filter((item) => item != keyword);

			// add first array
			searches.unshift(keyword);

			await AsyncStorage.setItem(
				"recentSearch",
				JSON.stringify(searches)
			);
			setRecentKeyWord(searches);
		} catch (error) {
			console.log(error);
		}
	};

	const getSearchKeyWord = async () => {
		try {
			const keyword = await AsyncStorage.getItem("recentSearch");
			return keyword ? JSON.parse(keyword) : [];
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	useEffect(() => {
		const fetchRecentSearches = async () => {
			try {
				const search = await getSearchKeyWord();
				setRecentKeyWord(search);
			} catch (error) {
				console.log(error);
			}
		};
		fetchRecentSearches();
	}, [callEffect]);

	const handleSearch = async (keyword) => {
		try {
			if (!keyword || keyword.trim() === "") {
				setError("Vui lòng nhập từ khóa tìm kiếm");
				return;
			}

			// save keyword
			await saveSearchKeyWord(keyword);
			setCallEffect((prev) => !prev);

			// call api search
			const response = await searchPoduct(keyword);
			if (response?.data.status === 200) {
				setResultSearch(response?.data.data);
			} else {
				setNotFound(response?.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleleItemRecentSearch = async (keyword) => {
		try {
			const list = await getSearchKeyWord();
			const updated = list.filter((item) => item !== keyword);
			await AsyncStorage.setItem("recentSearch", JSON.stringify(updated));
			setRecentKeyWord(updated);
			setCallEffect((prev) => !prev);
			console.log(list);
		} catch (error) {
			console.log(error);
		}
	};

	const handleReSearch = async (item) => {
		try {
			setSearchInput(item);
			setNotFound(null);
			setCallEffect((prev) => !prev);
			const response = await searchPoduct(item);
			console.log(response);
			if (response?.data.status === 200) {
				console.log(response?.data.data);
				setResultSearch(response?.data.data);
				setNotFound(null);
			} else {
				setNotFound(response?.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.containerView}>
					<StatusBar backgroundColor="transparent" translucent />
					<Header title="Tìm kiếm" isIconRight={false} />

					<View style={{ marginHorizontal: 43 }}>
						<InputData
							isSearch={true}
							placeholder="Tìm kiếm"
							returnKeyType="search"
							value={searchInput}
							onChangeText={(text) => {
								setSearchInput(text);
								setError(null);
							}}
							error={error}
							onSubmitEditing={() => handleSearch(searchInput)}
							onSearch={() => handleSearch(searchInput)}
							focus={true}
						/>
					</View>
					{error !== null ? (
						<View style={styles.containerError}>
							<Text style={styles.errortext}>{error}</Text>
						</View>
					) : null}

					{!searchInput ? (
						<>
							<Text style={styles.titleSearch}>
								Tìm kiếm gần đây
							</Text>
							<FlatList
								data={recentKeyWord}
								renderItem={({ item }) => (
									<HistorySearch
										name={item}
										onDelete={handleDeleleItemRecentSearch}
										onReSearch={handleReSearch}
									/>
								)}
								keyExtractor={(item, index) => index.toString()}
								scrollEnabled={true}
							/>
						</>
					) : !isLoading ? (
						resultSearch.length > 0 ? (
							<FlatList
								data={resultSearch}
								renderItem={({ item }) => (
									<ProducItems item={item} isPrice={true} />
								)}
								keyExtractor={(item) => {
									item.id_san_pham.toString();
								}}
							/>
						) : (
							<View style={styles.containerNotFound}>
								<Text style={styles.notFound}>{notFound}</Text>
							</View>
						)
					) : (
						<View></View>
					)}
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

export default Search;
