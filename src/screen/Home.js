import { StyleSheet, View } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import client, { randomCall } from "../api/client.js";
import SafeView from "../component/SafeView.js";

import { API_KEY } from "../config/API_KEY.js";

const Home = ({ navigation }) => {
	const [text, setText] = React.useState("");
	const [data, setData] = React.useState([]);
	const [disabled, setDisabled] = React.useState(true);

	const handleTextChange = (text) => {
		setText(text);
		if (text.length > 0) {
			setDisabled(false);
		} else setDisabled(true);
	};

	const handleOnpress = async () => {
		try {
			const res = await client.get(`${text}?api_key=${API_KEY}`);
			const result = res.data;

			navigation.navigate("Details", {
				name: result.name,
				jpl: result.nasa_jpl_url,
				isHazardous: result.is_potentially_hazardous_asteroid,
			});
		} catch (error) {
			console.log(`catch error`, error);
		}
	};

	const handleRandomSearch = async () => {
		try {
			const res = await randomCall.get();
			const data = res.data.near_earth_objects;
			setData(data);

			const randomId = getRandom(data).id;

			const randomData = await client.get(`${randomId}?api_key=${API_KEY}`);
			const result = await randomData.data;

			navigation.navigate("Details", {
				name: result.name,
				jpl: result.nasa_jpl_url,
				isHazardous: result.is_potentially_hazardous_asteroid,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getRandom = (items) => {
		return items[Math.floor(Math.random() * items.length)];
	};

	return (
		<SafeView style={styles.container}>
			<View style={styles.textContainer}>
				<TextInput
					label="Enter Asteroid ID"
					value={text}
					style={styles.textInput}
					keyboardType="decimal-pad"
					onChangeText={handleTextChange}
				/>
				<Button
					style={styles.margin}
					disabled={disabled}
					icon="arrow-right-thick"
					mode="contained"
					onPress={handleOnpress}>
					Search id
				</Button>
				<Button
					style={styles.margin}
					icon="arrow-right-thick"
					mode="contained"
					onPress={handleRandomSearch}>
					Search Random ID
				</Button>
			</View>
		</SafeView>
	);
};

export default Home;

const styles = StyleSheet.create({
	margin: {
		marginTop: 10,
	},
	container: {
		flex: 1,
	},
	textContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	textInput: {
		borderWidth: 0,
		borderRadius: 15,
		width: 250,
		height: 70,

		fontSize: 20,
		textAlign: "center",
	},
});
