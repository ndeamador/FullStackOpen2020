import React from "react";
import Text from "./Text";
import { useMutation } from "@apollo/client";
import { FlatList, View, TouchableWithoutFeedback, Alert } from "react-native";
import ReviewItem from "./ReviewItem";
import useCurrentUser from "../hooks/useCurrentUser";
import theme from "../theme";
import { useHistory } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = {
  extendedContainer: {
    backgroundColor: theme.colors.containers,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  baseButton: {
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    textAlign: "center",
    flexGrow: 1,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  separator: {
    height: 10,
  },
};

const MyReviewsView = () => {
  const {
    authorizedUser,
    loading,
    fetchMore,
    refetch: refetchCurrentUser,
  } = useCurrentUser({
    first: 8,
    withReviews: true,
  });

  const [deleteReviewById] = useMutation(DELETE_REVIEW);

  const history = useHistory();

  const onEndReach = () => {
    fetchMore();
  };

  const goToRepository = (id) => {
    history.push(`/repositories/${id}`);
  };

  const handleReviewDeletion = (id) => {
    deleteReviewById({ variables: { id } });
    refetchCurrentUser();
  };

  const confirmDeletion = (id) => {
    Alert.alert(
      "Delete review",
      "Are yo usure you want to delete this review?",
      [
        {
          text: "CANCEL",
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: () => {
            handleReviewDeletion(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) return <Text>loading</Text>;

  const reviews = authorizedUser ? authorizedUser.reviews.edges : undefined;

  if (reviews.length === 0) {
    return <Text>You have not written any reviews yet.</Text>;
  }

  const ItemSeparator = () => <View style={styles.separator} />;

  const ExtendedReviewItem = ({ review }) => {
    return (
      <View style={styles.extendedContainer}>
        <ReviewItem review={review} myReviews />
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              goToRepository(review.repositoryId);
            }}
          >
            <Text
              color="textDarkBackground"
              fontWeight="bold"
              style={{ ...styles.baseButton, ...styles.viewButton }}
            >
              View Repository
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              confirmDeletion(review.id);
            }}
          >
            <Text
              color="textDarkBackground"
              fontWeight="bold"
              style={{ ...styles.baseButton, ...styles.deleteButton }}
            >
              Delete Review
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ExtendedReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviewsView;
