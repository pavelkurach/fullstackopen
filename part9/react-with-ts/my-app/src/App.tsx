type coursePart = {
  name: string;
  exerciseCount: number;
}

function Header(props: { courseName: string }) {
  return <h1>{props.courseName}</h1>;
}

function Content(props: { courseParts: coursePart[] }) {
  return <>
    <p>
      {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
    </p>
    <p>
      {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
    </p>
    <p>
      {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
    </p>
  </>;
}

function Total(props: {
  courseParts: coursePart[],
  callbackfn: (carry: number, part: coursePart) => number
}) {
  return <p>
    Number of exercises{' '}
    {props.courseParts.reduce(props.callbackfn, 0)}
  </p>;
}

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: coursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts}
             callbackfn={(carry, part) => carry + part.exerciseCount} />
    </div>
  );
};

export default App;