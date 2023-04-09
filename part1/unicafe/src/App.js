import { useState } from "react";

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const Header = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ name, counter }) => (
  <div>
    {name}: {counter}
  </div>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  return (
    <div>
      <Header text="give feedback" />
      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />
      <Header text="statistics" />
      <Statistics name="good" counter={good} />
      <Statistics name="neutral" counter={neutral} />
      <Statistics name="bad" counter={bad} />
      <Statistics
        name="average"
        counter={total !== 0 ? (good - bad) / total : ""}
      />
      <Statistics
        name="positive"
        counter={total !== 0 ? (good * 100) / total + " %" : ""}
      />
    </div>
  );
};

export default App;
