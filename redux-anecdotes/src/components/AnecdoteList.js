import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();
  const vote = (id, votes, content) => {
    dispatch(voteAnecdote(id, votes, content));
    dispatch(setNotification(`you voted '${content}'`, 10));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                vote(anecdote.id, anecdote.votes, anecdote.content)
              }>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Anecdotes;
