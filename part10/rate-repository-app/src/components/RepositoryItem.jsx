import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Text from "./Text";
import RatingsBox from "./RatingsBox";
import theme from "../theme";
import * as Linking from "expo-linking";
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    padding: 10,
    marginBottom: 1,
    backgroundColor: theme.colors.containers,
  },

  repositoryContainer: {
    flexDirection: "row",
    padding: 10,
  },

  flexRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  flexColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 20,
    flexShrink: 1,
  },

  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },

  languageBox: {
    color: theme.colors.textDarkBackground,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
  },

  gitHubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    margin: 15,
    padding: 15,
    textAlign: "center",
  },
});

const RepositoryItem = ({ repository, singleRepositoryView }) => {
  const history = useHistory();
  const openSingleRepositoryView = (repository) => {
    history.push(`/repositories/${repository.id}`);
  };

  const openInGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <TouchableOpacity onPress={() => openSingleRepositoryView(repository)}>
      <View style={styles.mainContainer}>
        <View style={styles.repositoryContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: repository.ownerAvatarUrl,
            }}
          />
          <View style={styles.flexColumn}>
            <Text fontWeight="bold" testID="repositoryName">
              {repository.fullName}
            </Text>
            <Text testID="repositoryDescription">{repository.description}</Text>
            {/* Newly created repositories have no language tag, so we don't want to display a blue blob with no text if no language is fetched. */}
            {repository.language && (
              <Text style={styles.languageBox} testID="repositoryLanguage">
                {repository.language}
              </Text>
            )}
          </View>
        </View>

        <RatingsBox repository={repository} />
        {singleRepositoryView && (
          <TouchableWithoutFeedback onPress={openInGitHub}>
            <Text
              color="textDarkBackground"
              fontWeight="bold"
              style={styles.gitHubButton}
            >
              Open in GitHub
            </Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;
