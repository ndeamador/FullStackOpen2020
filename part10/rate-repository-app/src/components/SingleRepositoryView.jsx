import React from "react";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { FlatList } from "react-native";
import Text from "./Text";
import useSingleRepository from "../hooks/useSingleRepository";
import ReviewItem from "./ReviewItem";

const SingleRepositoryView = () => {
  let { id } = useParams();

  const { repository, fetchMore } = useSingleRepository({
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
