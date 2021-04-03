import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  let numberOfAnecdotes = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(
    Array.apply(null, new Array(numberOfAnecdotes)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const handleClick = () => {
    let max = anecdotes.length;
    let randomNumber = Math.floor(Math.random() * max);
    console.log(randomNumber);
    if (randomNumber === selected) {
      handleClick();
      return;
    }
    setSelected(randomNumber);
  };

  const voteClick = () => {
    let newArray = [...vote];
    newArray[selected] += 1;
    console.log(newArray);
    setVote(newArray);
  };

  let indexOfMaxVote = vote.indexOf(Math.max(...vote));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br />
      has {vote[selected]} votes <br />
      <button onClick={voteClick}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[indexOfMaxVote]}
    </div>
  );
};

export default App;
