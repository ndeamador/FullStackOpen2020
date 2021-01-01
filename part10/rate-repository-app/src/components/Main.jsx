import React from "react";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Switch, Redirect } from "react-router-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRepositoryView from "./SingleRepositoryView";
import CreateReview from "./CreateReview";
import MyReviewsView from "./MyReviewsView";

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
        <Route path="/repositories/:id" component={SingleRepositoryView} />
        <Route path="/createreview" component={CreateReview} />
        <Route path="/signup" component={SignUp} />
        <Route path="/myreviews" component={MyReviewsView} />
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
