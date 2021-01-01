import React from "react";
import Text from "./Text";
import { CURRENT_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";
import useCurrentUser from "../hooks/useCurrentUser";

const MyReviewsView = () => {
  // const { data, loading } = useQuery(CURRENT_USER, {variables: {withReviews: true, first: 8}});
  const { authorizedUser, loading, fetchMore } = useCurrentUser({
    first: 8,
    withReviews: true,
  });

  // const authorizedUser = data? data.authorizedUser: undefined;

  if (loading) return <Text>loading</Text>;

  const reviews = authorizedUser ? authorizedUser.reviews.edges : undefined;

  const onEndReach = () => {
    console.log('myrevs endReached');
    fetchMore();
  };

  if (reviews.length === 0) return <Text>You have not written any reviews yet.</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} myReviews />}
      keyExtractor={(item) => item.node.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviewsView;
