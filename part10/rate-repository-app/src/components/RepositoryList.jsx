import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories, { sortingQueryOptions } from "../hooks/useRepositories";
import SortingMenu from "./SortingMenu";
import Filter from "./Filter";
import { Divider } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listHeaderContainer: {
    backgroundColor: "#e1e4e8",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const TouchableRepositoryItem = (repository) => {
  return <RepositoryItem repository={repository.item} />;
};

const renderListHeaderComponent = (
  setOrderBy,
  setOrderDirection,
  setSearchKeyword
) => {
  return (
    <View style={styles.listHeaderContainer}>
      <Filter setSearchKeyword={setSearchKeyword} />
      <Divider />
      <SortingMenu
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
  setSearchKeyword,
  onEndReach,
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
        setOrderDirection,
        setSearchKeyword
      )}
      // The following prop makes the header sticky:
      stickyHeaderIndices={[0]}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(sortingQueryOptions.creationDate);
  const [orderDirection, setOrderDirection] = useState(
    sortingQueryOptions.descending
  );
  const [searchKeyword, setSearchKeyword] = useState("");

  const { repositories, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword,
    first: 6
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
