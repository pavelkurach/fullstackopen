const Header = (props) => {
  return <h3>{props.course}</h3>;
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
    <b>
      total of{" "}
      {props.exercises.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      )}{" "}
      exercises
    </b>
  );
};

export default function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((obj) => obj.exercises)} />
    </div>
  );
}
