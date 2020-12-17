import React from "react";
// import Constants from 'expo-constants';
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Switch, Redirect } from "react-router-native";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact component={RepositoryList} />
        <Route path="/signin" component={SignIn} />
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
