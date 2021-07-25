import { getAll, createNew, votingAnecdote } from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const { id, votes, content } = action.data.updatedAnecdote;

      const changedAnecdote = {
        content: content,
        id: id,
        votes: votes,
      };

      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      );
    case "NEW_ANECDOTE":
      const newAnecdote = {
        content: action.data.newAnecdote.content,
        id: action.data.newAnecdote.id,
        votes: 0,
      };

      return [...state, newAnecdote];

    case "FILTER":
      const filteredAnecdotes = state.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(action.data.content.toLowerCase())
      );

      return filteredAnecdotes;

    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: {
        newAnecdote,
      },
    });
  };
};

export const voteAnecdote = (id, votes, content) => {
  return async (dispatch) => {
    const updatedAnecdote = await votingAnecdote(id, votes, content);
    dispatch({
      type: "VOTE",
      data: {
        updatedAnecdote,
      },
    });
  };
};

export const filterAnecdote = (searchStr) => {
  return {
    type: "FILTER",
    data: {
      content: searchStr,
    },
  };
};

export default anecdoteReducer;
