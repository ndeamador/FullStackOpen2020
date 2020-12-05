import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const style = {
    margin: 10,
    padding: 10,
    backgroundColor: "lightgrey",
  };

  switch (part.name) {
    case "Fundamentals":
      return (
        <div style={style}>
          <div>{part.name}</div>
          <div>{part.exerciseCount}</div>
          <div>{part.description}</div>
        </div>
      );

    case "Using props to pass data":
      return (
        <div style={style}>
          <div>{part.name}</div>
          <div>{part.exerciseCount}</div>
          <div>{part.groupProjectCount}</div>
        </div>
      );

    case "Deeper type usage":
      return (
        <div style={style}>
          <div>{part.name}</div>
          <div>{part.exerciseCount}</div>
          <div>{part.description}</div>
          <div>{part.exerciseSubmissionLink}</div>
        </div>
      );

    case "Course Part for exercise 9.15":
      return (
        <div style={style}>
          <div>{part.name}</div>
          <div>{part.exerciseCount}</div>
          <div>{part.description}</div>
        </div>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
