import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
    display: "flex",
    flexDirection: "row",
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" component={AppBarTab} title="Repositories" />
      <Link to="/signin" component={AppBarTab} title="Sign in" />
    </View>
  );
};

export default AppBar;
