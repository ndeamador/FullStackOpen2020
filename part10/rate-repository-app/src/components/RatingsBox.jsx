import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  flexRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  flexColumn: {
    flexDirection: "column",
    alignItems: "center",
  },

  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

export const kFormatter = (num) => {
  if (num >= 1000) {
    // ParseFloat gets rid of trailing zeros
    return `${parseFloat((num / 1000).toFixed(1))}k`;
  }

  return num;
};

const RatingsBox = ({ repository }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexColumn}>
        <Text fontWeight="bold" testID="repositoryStars">
          {kFormatter(repository.stargazersCount)}
        </Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.flexColumn}>
        <Text fontWeight="bold" testID="repositoryForks">
          {kFormatter(repository.forksCount)}
        </Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.flexColumn}>
        <Text fontWeight="bold" testID="repositoryReviews">
          {repository.reviewCount}
        </Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.flexColumn}>
        <Text fontWeight="bold" testID="repositoryRating">
          {repository.ratingAverage}
        </Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

export default RatingsBox;
