import React, { useState } from "react";

const Button = ({ type, handleClick }) => (
  <button onClick={handleClick}>{type}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h2>give feedback</h2>
      <Button type={"good"} handleClick={handleGood} />
      <Button type={"neutral"} handleClick={handleNeutral} />
      <Button type={"bad"} handleClick={handleBad} />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;