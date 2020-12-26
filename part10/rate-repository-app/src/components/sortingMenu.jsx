import React, { useState } from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import useRepositories, {sortingQueryOptions} from '../hooks/useRepositories';

const options = {
  latest: "Latest",
  highest: "Highest rated",
  lowest: "Lowest rated",
};

const SortingMenu = ({setOrderBy, setOrderDirection}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(options.latest);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        paddingTop: 25,
        paddingBottom: 25,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button icon="menu-down" onPress={openMenu}>
            Sort by:{selected}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setSelected(options.latest);
            setOrderBy(sortingQueryOptions.creationDate);
            setOrderDirection(sortingQueryOptions.descending);
            closeMenu();
          }}
          title={options.latest}
        />
        <Menu.Item
          onPress={() => {
            setSelected(options.highest);
            setOrderBy(sortingQueryOptions.rating);
            setOrderDirection(sortingQueryOptions.descending);
            closeMenu();
          }}
          title={options.highest}
        />
        <Menu.Item
          onPress={() => {
            setSelected(options.lowest);
            setOrderBy(sortingQueryOptions.rating);
            setOrderDirection(sortingQueryOptions.ascending);
            closeMenu();
          }}
          title={options.lowest}
        />
      </Menu>
    </View>
  );
};

export default SortingMenu;
