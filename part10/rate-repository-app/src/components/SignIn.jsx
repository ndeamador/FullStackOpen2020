import React from "react";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { View, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import theme from "../theme";

import useSignIn from "../hooks/useSignIn";

const styles = {
  mainContainer: {
    backgroundColor: theme.colors.containers,
    padding: 15,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
    textAlign: "center",
  },
};

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.mainContainer}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        testID="passwordField"
      />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text
          color="textDarkBackground"
          fontWeight="bold"
          style={styles.signInButton}
        >
          Sign in
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const handleSignin = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log('sigin: ', data);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={handleSignin} />;
};

export default SignIn;
