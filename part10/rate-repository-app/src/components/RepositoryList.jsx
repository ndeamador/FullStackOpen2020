import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = (repository) => (
  <RepositoryItem repository={repository.item} />
);

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // const repositoryNodes = repositories
  //   ? repositories.edges.map((edge) => edge.node)
  //   : [];

  // return (
  //   <FlatList
  //     data={repositoryNodes}
  //     ItemSeparatorComponent={ItemSeparator}
  //     renderItem={renderItem}
  //     keyExtractor={(item) => item.id}
  //   />
  // );
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
