import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },

  errorInputStyle: {
    borderColor: "red",
  },
});

const TextInput = ({ style, error, ...props }) => {
  // When styles are given as arrays, the later entries take precedence.
  const textInputStyle = [
    style,
    styles.textInput,
    error && styles.errorInputStyle,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
