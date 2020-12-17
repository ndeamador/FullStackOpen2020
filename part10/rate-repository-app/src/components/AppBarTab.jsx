import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Text from "./Text";

const AppBarTab = ({ title, ...props }) => {
  return (
    <TouchableWithoutFeedback>
      <Text
        color="textDarkBackground"
        fontWeight="bold"
        style={{ padding: 15 }}
        // the Link component does not seem to work without passing all props to the text element.
        {...props}
      >
        {title}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
