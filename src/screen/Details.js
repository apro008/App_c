import { StyleSheet, View, Linking } from "react-native";
import React from "react";

import SafeView from "../component/SafeView.js";
import AppText from "../component/AppText.js";

const Details = ({ route }) => {
	const data = route.params;

	return (
		<SafeView>
			<View style={styles.margin}>
				<AppText>Name: {data.name}</AppText>
				<AppText onPress={() => Linking.openURL(`${data.jpl}`)}>
					nasa_jpl_url : {data.jpl}
				</AppText>
				<AppText>isHazardous : {data.isHazardous.toString()}</AppText>
			</View>
		</SafeView>
	);
};

export default Details;

const styles = StyleSheet.create({
	margin: {
		margin: 10,
	},
	textContainer: {
		alignItems: "center",
	},
	textStyle: {
		textDecorationLine: "underline",
		fontSize: 20,
		fontWeight: "bold",
	},
});
