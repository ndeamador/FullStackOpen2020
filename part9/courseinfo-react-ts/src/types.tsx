// export interface CoursePart {
//   name: string,
//   exerciseCount: number
// }

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

// The using a string literal in name allows typescript to identify each coursepart in the database.
interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
  // description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  // description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "Course Part for exercise 9.15"
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;