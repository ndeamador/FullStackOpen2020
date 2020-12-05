import React from "react";
import { CoursePart } from "../types";
import Part from './Part';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => {
  return (
    <div>
      {courseParts.map((part, i) => <Part key={i} part={part}/>)}
    </div>
  );
};

export default Content;
