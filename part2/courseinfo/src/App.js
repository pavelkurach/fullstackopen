const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const content = props.parts.map((obj) => {
    return <Part key={obj.id} name={obj.name} exercises={obj.exercises} />;
  });
  return <>{content}</>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      )}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((obj) => obj.exercises)} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Additional topics",
        exercises: 5,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
