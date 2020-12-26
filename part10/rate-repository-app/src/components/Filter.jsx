import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = {
  filterContainer: {
    margin: 15,
  },
};

const Filter = ({ setSearchKeyword }) => {
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(currentKeyword, 500);

  useEffect(() => {
    setSearchKeyword(debouncedKeyword);
  }, [debouncedKeyword]);

  const onChangeSearch = (query) => setCurrentKeyword(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={currentKeyword}
      style={styles.filterContainer}
    />
  );
};

export default Filter;
