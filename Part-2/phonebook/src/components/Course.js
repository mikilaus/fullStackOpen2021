import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  if (course.parts.length !== 0) {
    return course.parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ));
  } else {
    return <p>There is no any part in this course.</p>;
  }
};

const Total = ({ course }) => {
  let arrayOfExercises = course.parts.map((part) => part.exercises);

  let total = arrayOfExercises.reduce((acc, value) => {
    return acc + value;
  });

  return <h4>total of {total} exercises</h4>;
};

export default Course;
