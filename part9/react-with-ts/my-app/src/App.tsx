interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
    kind: 'basic'
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: 'group'
  },
  {
    name: 'Basics of type Narrowing',
    exerciseCount: 7,
    description: 'How to go from unknown to string',
    kind: 'basic'
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
    kind: 'background'
  },
  {
    name: 'TypeScript in frontend',
    exerciseCount: 10,
    description: 'a hard part',
    kind: 'basic'
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    kind: 'special'
  }
];

const Part = (props: { coursePart: CoursePart }) => {
  switch (props.coursePart.kind) {
    case 'basic':
      return (
        <div>
          <div>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </div>
          <div><i>{props.coursePart.description}</i></div>
        </div>);
    case 'group':
      return (
        <div>
          <div>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </div>
          <div>project exercises {props.coursePart.groupProjectCount}</div>
        </div>);
    case 'background':
      return (
        <div>
          <div><b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </div>
          <div><i>{props.coursePart.description}</i></div>
          <div>submit to {props.coursePart.backgroundMaterial}</div>
        </div>);
    case 'special':
      // eslint-disable-next-line no-case-declarations
      const requirements = props.coursePart.requirements;
      return (
        <div>
          <div><b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </div>
          <div><i>{props.coursePart.description}</i></div>
          <div>required skills: {requirements.map(r =>
            <span key={requirements.indexOf(r)}>{r} </span>)}</div>
        </div>);
  }
};

function Header(props: { courseName: string }) {
  return <h1>{props.courseName}</h1>;
}

function Content(props: { courseParts: CoursePart[] }) {
  return (
    <>
      {props.courseParts.map(part => {
          return (
            <div key={part.name}>
              <Part coursePart={part} />
              <br />
            </div>
          );
        }
      )}
    </>
  );
}

function Total(props: {
  courseParts: CoursePart[],
  callbackfn: (carry: number, part: CoursePart) => number
}) {
  return <p>
    Number of exercises{' '}
    {props.courseParts.reduce(props.callbackfn, 0)}
  </p>;
}

const App = () => {
  const courseName = 'Half Stack application development';

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