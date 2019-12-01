import React from "react";
import {Text, View, StyleSheet, Button } from "react-native"

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ListScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Button onPress={() => navigation.push("Detail")} title="Test" />
  </View>
);

export const MapScreen = () => (
  <View style={styles.container}>
    <Text>Map</Text>
  </View>
);

export const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Button onPress={() => navigation.push("Detail")} title="Detail" />
    <Button onPress={() => navigation.popToTop()} title="Reset" />
  </View>
);

const ListStack = createStackNavigator({
  List : ListScreen,
  Detail: DetailScreen,
});

const Navigator = createBottomTabNavigator(
  {
    List: ListStack,
    Map: MapScreen,
  },
  {
    initialRouteName: "List",
  }
);

export default createAppContainer(Navigator);