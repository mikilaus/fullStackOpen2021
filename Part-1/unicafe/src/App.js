import React, { useState } from "react";

const Button = ({ type, handleClick }) => (
  <button onClick={handleClick}>{type}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ all, good, bad, neutral }) => {
  if (all !== 0) {
    return (
      <table>
        <tbody>
          <Statistic text={"good"} value={good} />
          <Statistic text={"neutral"} value={neutral} />
          <Statistic text={"bad"} value={bad} />
          <Statistic text={"all"} value={all} />
          <Statistic text={"average"} value={(bad * -1 + good * 1) / all} />
          <Statistic text={"positive"} value={`${(good / all) * 100} %`} />
        </tbody>
      </table>
    );
  }
  return <p>No feedback given</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  let all = good + neutral + bad;
  return (
    <div>
      <h2>give feedback</h2>
      <Button type={"good"} handleClick={handleGood} />
      <Button type={"neutral"} handleClick={handleNeutral} />
      <Button type={"bad"} handleClick={handleBad} />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  );
};

export default App;
