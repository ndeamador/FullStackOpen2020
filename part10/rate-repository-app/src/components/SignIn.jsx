import React from "react";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { View, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";
import theme from "../theme";

const styles = {
  mainContainer: {
    backgroundColor: theme.colors.containers,
    padding: 15,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
    textAlign: "center",
  }
};

const initialValues = {
  username: "",
  passwrod: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.mainContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <Text color="textDarkBackground" fontWeight="bold" style={styles.signInButton}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const handleSignin = ({ username, password }) => {
    console.log("10.8 login values: ", username, password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSignin}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
