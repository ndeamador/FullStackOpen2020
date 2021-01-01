import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { TouchableWithoutFeedback, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { useHistory } from "react-router-native";

import Text from "./Text";
import theme from "../theme";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_REVIEW } from "../graphql/mutations";

import { CURRENT_USER } from "../graphql/queries";

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
  ownerName: yup
    .string("Owner's name must be a string.")
    .required("Repository owner's GitHub username is required."),
  repositoryName: yup
    .string("Repository's name must be a string.")
    .required("Repository's name is required."),
  rating: yup
    .number("Rating must be a number.")
    .min(0, "Minimum rating is 0")
    .max(100, "Maximum rating is 100")
    .integer("Rating must be an integer")
    .required("Rating is required"),

  review: yup.string("Review must be a string."),
});

validationSchema.isValid({});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.mainContainer}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner's Github username"
        testID="ownerNameField"
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository's name"
        testID="repositoryNameField"
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        testID="ratingField"
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        testID="textField"
        multiline
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text
          color="textDarkBackground"
          fontWeight="bold"
          style={styles.button}
        >
          Create a review
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CreateReview = () => {
  const [createNewReview, result] = useMutation(CREATE_REVIEW, {
    refetchQueries: [
      { query: CURRENT_USER, variables: { withReviews: true, first: 8 } },
    ],
  });

  const history = useHistory();


  const handleSubmit = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const { data } = await createNewReview({
        variables: {
          repositoryName,
          ownerName,
          rating: parseInt(rating),
          text,
        },
      });

      history.push(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log("CreateReview.jsx handleSubmit error: ", e);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        review: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
