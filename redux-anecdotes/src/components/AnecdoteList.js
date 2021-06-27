import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();
  const vote = (id, votes) => {
    dispatch(voteAnecdote(id, votes));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.votes)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Anecdotes;
