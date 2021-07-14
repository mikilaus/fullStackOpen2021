import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const votes = action.data.votes;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: votes + 1,
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
      console.log(filteredAnecdotes);

      return filteredAnecdotes;

    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: {
        newAnecdote,
      },
    });
  };
};

export const voteAnecdote = (id, votes) => {
  return {
    type: "VOTE",
    data: {
      id: id,
      votes: votes,
    },
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
