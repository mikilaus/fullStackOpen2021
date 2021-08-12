import commentServices from "../services/comments";

const commentsReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_COMMENTS":
      return action.data;

    default:
      return state;
  }
};

export const initComments = () => async (dispatch) => {
  const comments = await commentServices.getAll();

  dispatch({
    type: "INIT_COMMENTS",
    data: comments,
  });
};

export default commentsReducer;
