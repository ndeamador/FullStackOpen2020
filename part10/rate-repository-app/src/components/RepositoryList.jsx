import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories, { sortingQueryOptions } from "../hooks/useRepositories";
import { useHistory } from "react-router-native";
import SortingMenu from "./SortingMenu";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const TouchableRepositoryItem = (repository) => {
  return (
    // <TouchableOpacity onPress={() => openSingleRepositoryView(repository)}>
    <RepositoryItem repository={repository.item} />
    //  </TouchableOpacity>
  );
};

const renderListHeaderComponent = (setOrderBy, setOrderDirection) => {
  return (
    <>
      <SortingMenu
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    </>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={TouchableRepositoryItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderListHeaderComponent(
        setOrderBy,
        setOrderDirection
      )}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(sortingQueryOptions.creationDate);
  const [orderDirection, setOrderDirection] = useState(
    sortingQueryOptions.descending
  );

  const { repositories } = useRepositories(orderBy, orderDirection);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

export default RepositoryList;
