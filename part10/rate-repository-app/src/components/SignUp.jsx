import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

const styles = {
  mainContainer: {
    backgroundColor: theme.colors.containers,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
    textAlign: "center",
  },
};

const validationSchema = yup.object().shape({
  username: yup
    .string("Username must be a string.")
    .required("Username is required.")
    .min(1, "The minimum length is 1.")
    .max(30, "The maximum length is 30."),

  password: yup
    .string("Password must be a string.")
    .required("Password is required.")
    .min(5, "The minimum length is 5.")
    .max(50, "The maximum length is 50."),

  confirmPassword: yup
    .string("Password must be a string.")
    .required("Password confirmation is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

validationSchema.isValid({});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.mainContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="confirmPassword"
        placeholder="Confirm Password"
        secureTextEntry
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text
          color="textDarkBackground"
          fontWeight="bold"
          style={styles.button}
        >
          Sign up
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const [createNewUser, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const handleSubmit = async ({ username, password }) => {
    try {
      console.log("clicked", username);
      const { data } = await createNewUser({
        variables: { username, password },
      });
      console.log("create response: ", data);

      // could just use "username", just making extra sure that user is only signed in if there is a response from sign up.
      await signIn({ username: data.createUser.username, password });

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
