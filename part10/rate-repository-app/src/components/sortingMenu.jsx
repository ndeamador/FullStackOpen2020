import React, { useState } from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { sortingQueryOptions } from "../hooks/useRepositories";

const styles = {
  mainContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "black",
  },
  buttonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
};

const options = {
  latest: "Latest",
  highest: "Highest rated",
  lowest: "Lowest rated",
};

const SortingMenu = ({ setOrderBy, setOrderDirection }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(options.latest);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.mainContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={openMenu}
            icon="menu-down"
            uppercase={false}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Sort by: {selected}
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
