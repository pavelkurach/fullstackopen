const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Content = (props) => {
	const content = props.parts.map((obj) => {
		return <Part name={obj.name} exercises={obj.exercises} />;
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

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{ name: "Fundamentals of React", exercises: 10 },
			{ name: "Using props to pass data", exercises: 7 },
			{ name: "State of a component", exercises: 14 },
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total exercises={course.parts.map((obj) => obj.exercises)} />
		</div>
	);
};

export default App;
