import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from "../theme";


const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  }
});

const TextInput = ({ style, error, ...props }) => {
  // When styles are given as arrays, the later entries take precedence.
  const textInputStyle = [style, styles.textInput];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;