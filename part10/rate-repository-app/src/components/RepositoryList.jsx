import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// const renderItem = (repository) => (
//   <TouchableOpacity onPress={() => openSingleRepositoryView(repository)}>
//     <RepositoryItem repository={repository.item} />
//   </TouchableOpacity>
// );

const TouchableRepositoryItem = (repository) => {
  // const history = useHistory();

  // const handleRepositoryPress = (repository) => {
  //   console.log("clicked", repository);
  // };

  // const openSingleRepositoryView = (repository) => {
  //   history.push(`/repositories/${repository.id}`);
  // };

  return (
    // <TouchableOpacity onPress={() => openSingleRepositoryView(repository)}>
    <RepositoryItem repository={repository.item} />
    //  </TouchableOpacity>
  );
};

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={TouchableRepositoryItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // const history = useHistory();

  // const openSingleRepositoryView = (repository) => {
  //   history.push(`/repositories/${repository.item.id}`);
  //   console.log(repository);
  // };

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
