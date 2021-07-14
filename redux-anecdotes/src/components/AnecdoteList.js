import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  voteNotification,
  deleteNotification,
} from "../reducers/notificationReducer";
import Filter from "./Filter";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();
  const vote = (id, votes, content) => {
    dispatch(voteAnecdote(id, votes));
    dispatch(voteNotification(content));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
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
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Anecdotes;
