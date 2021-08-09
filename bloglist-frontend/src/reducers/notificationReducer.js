const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET":
      return action.data;

    case "DELETE":
      return null;

    default:
      return state;
  }
};

let timeoutId = null;

export const setNotification = (message, type, lasts) => async (dispatch) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch({
      type: "DELETE",
    });
  }, lasts * 1000);

  dispatch({
    type: "SET",
    data: {
      message,
      type,
    },
  });
};

export default notificationReducer;
