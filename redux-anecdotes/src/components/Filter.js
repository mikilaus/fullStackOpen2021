import React from "react";
import { useDispatch } from "react-redux";
import { filterAnecdote } from "../reducers/anecdoteReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const searchStr = event.target.value;
    dispatch(filterAnecdote(searchStr));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
