import { useState } from "react";

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const Header = ({ text }) => <h1>{text}</h1>;

const StatisticsLine = ({ name, value }) => (
  <tr>
    <td>{name}:</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticsLine name="good" value={good} />
          <StatisticsLine name="neutral" value={neutral} />
          <StatisticsLine name="bad" value={bad} />
          <StatisticsLine
            name="average"
            value={((good - bad) / total).toFixed(1)}
          />
          <StatisticsLine
            name="positive"
            value={((good * 100) / total).toFixed(2) + " %"}
          />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
