import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNew = async (anecdote) => {
  const object = {
    content: anecdote,
    votes: 0,
  };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

export const votingAnecdote = async (id, votes, content) => {
  const newAnecdote = {
    content: content,
    id: id,
    votes: votes + 1,
  };
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${id}`,
    newAnecdote
  );
  return response.data;
};
