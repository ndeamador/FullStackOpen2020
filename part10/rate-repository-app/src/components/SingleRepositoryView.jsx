import React from "react";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../theme";
import Text from "./Text";
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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.scoreContainer}>
        <Text fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(parseISO(review.createdAt), "d.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepositoryView = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id: id },
  });

  if (loading) return <Text>loadin...</Text>;

  // return <RepositoryItem repository={data.repository} singleRepositoryView />;

  return (
    <FlatList
      data={data.repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={data.repository} singleRepositoryView />
      )}
      // ...
    />
  );
};

export default SingleRepositoryView;
