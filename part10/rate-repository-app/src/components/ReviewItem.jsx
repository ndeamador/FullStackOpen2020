import React from 'react';
import { View, StyleSheet } from "react-native";
import Text from './Text';
import theme from '../theme';
import { format, parseISO } from "date-fns";


const styles = StyleSheet.create({
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 25,
    marginTop: 10,
    backgroundColor: theme.colors.containers,
  },

  textContainer: {
    flexDirection: "column",
    display: "flex",
    flexShrink: 1,
    paddingLeft: 10,
  },

  scoreContainer: {
    borderColor: theme.colors.primary,
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

const ReviewItem = ({ review, myReviews }) => {

  // console.log('inrevitem:', review);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.scoreContainer}>
        <Text fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight="bold">{myReviews ? review.repositoryId : review.user.username}</Text>
        <Text color="textSecondary">
          {format(parseISO(review.createdAt), "d.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;