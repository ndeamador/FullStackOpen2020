import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import RatingsBox from "./RatingsBox";
import theme from "../theme";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    padding: 10,
    marginBottom: 1,
    backgroundColor: theme.colors.containers,
  },

  repositoryContainer: {
    flexDirection: "row",
    padding: 10,
  },

  flexRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  flexColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 20,
  },

  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },

  languageBox: {
    color: theme.colors.textDarkBackground,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.repositoryContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: repository.ownerAvatarUrl,
          }}
        />
        <View style={styles.flexColumn}>
          <Text fontWeight="bold" testID="repositoryName">{repository.fullName}</Text>
          <Text testID="repositoryDescription">{repository.description}</Text>
          <Text style={styles.languageBox} testID="repositoryLanguage">{repository.language}</Text>
        </View>
      </View>

      <RatingsBox repository={repository} />
    </View>
  );
};

export default RepositoryItem;
