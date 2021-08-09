import usersServices from "../services/users";

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;

    default:
      return state;
  }
};

export const initUsers = () => async (dispatch) => {
  const users = await usersServices.getAll();
  dispatch({
    type: "INIT",
    data: users,
  });
};

export default usersReducer;
