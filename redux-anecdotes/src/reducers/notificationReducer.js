const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      const newState = action.data.content;
      return newState;

    case "DELETE":
      return null;

    default:
      return state;
  }
};

let timeoutId = null;

export const setNotification = (content, lasts) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: "DELETE",
      });
    }, lasts * 1000);

    dispatch({
      type: "NOTIFICATION",
      data: {
        content: content,
      },
    });
  };
};

export const deleteNotification = () => {
  return {
    type: "DELETE",
  };
};

export default notificationReducer;
