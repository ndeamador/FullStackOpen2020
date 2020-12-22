import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { Link, useHistory } from "react-router-native";

import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { CURRENT_USER } from "../graphql/queries";
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
    display: "flex",
    flexDirection: "row",
  },
  scrollView: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const { loading, error, data } = useQuery(CURRENT_USER);
  const history = useHistory();

  const userLoggedIn = data && data.authorizedUser ? true : false;

  const handleSignOut = async () => {
    history.push('/');
    await authStorage.removeAccessToken();

    // active queries will be called again (which means the current user query will return null due to being called with no token).
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Link to="/" component={AppBarTab} title="Repositories" />
        {userLoggedIn && <Link to="/createreview" component={AppBarTab} title="Create a review" />}
        {userLoggedIn ? (
          <AppBarTab title="Sign out" onPress={handleSignOut}/>
        ) : (
          <Link to="/signin" component={AppBarTab} title="Sign in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
