import React, { useState } from "react";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { format, parseISO } from "date-fns";
import useSingleRepository from "../hooks/useSingleRepository";
import ReviewItem from './ReviewItem';

// const styles = StyleSheet.create({
//   reviewContainer: {
//     display: "flex",
//     flexDirection: "row",
//     padding: 25,
//     marginTop: 10,
//     backgroundColor: theme.colors.containers,
//   },

//   textContainer: {
//     flexDirection: "column",
//     display: "flex",
//     flexShrink: 1,
//     paddingLeft: 10,
//   },

//   scoreContainer: {
//     borderColor: theme.colors.primary,
//     borderRadius: 25,
//     borderWidth: 3,
//     padding: 10,
//     height: 50,
//     width: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// const ReviewItem = ({ review }) => {
//   return (
//     <View style={styles.reviewContainer}>
//       <View style={styles.scoreContainer}>
//         <Text fontWeight="bold" color="primary">
//           {review.rating}
//         </Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text fontWeight="bold">{review.user.username}</Text>
//         <Text color="textSecondary">
//           {format(parseISO(review.createdAt), "d.MM.yyyy")}
//         </Text>
//         <Text>{review.text}</Text>
//       </View>
//     </View>
//   );
// };

const SingleRepositoryView = () => {
  let { id } = useParams();

  const { repository, loading, fetchMore } = useSingleRepository({
    id,
    first: 2,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (!repository) return <Text>loading...</Text>;

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} singleRepositoryView />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;
