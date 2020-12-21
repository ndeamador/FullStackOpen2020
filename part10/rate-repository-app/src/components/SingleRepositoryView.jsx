import React from "react";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const SingleRepositoryView = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id: id },
  });

  if (loading) return "loading...";

  return <RepositoryItem repository={data.repository} singleRepositoryView />;
};

export default SingleRepositoryView;
