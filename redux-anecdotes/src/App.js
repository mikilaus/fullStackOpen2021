import React, { useEffect } from "react";
import NewAnecdote from "./components/AnecdoteForm";
import Anecdotes from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { initAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotes());
  }, []);

  return (
    <div>
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
