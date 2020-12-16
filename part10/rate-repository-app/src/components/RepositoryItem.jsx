import React from "react";
import { View, Text } from "react-native";

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <Text>Full name: {repository.fullName}</Text>
      <Text>Description: {repository.description}</Text>
      <Text>Language: {repository.language}</Text>
      <Text>Stars: {repository.stargazersCount}</Text>
      <Text>Forks: {repository.forksCount}</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
      <Text>Rating: {repository.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
