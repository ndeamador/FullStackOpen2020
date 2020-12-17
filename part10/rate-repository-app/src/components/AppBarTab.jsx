import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Text from "./Text";

const AppBarTab = ({ label }) => {
  return (
    <TouchableWithoutFeedback onPress={() => alert("Pressed!")}>
      <Text color="textDarkBackground" fontWeight="bold" style={{ padding: 15 }}>
        {label}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
