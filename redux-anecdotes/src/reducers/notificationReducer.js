const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "VOTED":
      const newState = `you voted ${action.data.content}`;
      return newState;

    case "CREATED":
      const newState2 = action.data.content;
      return newState2;

    case "DELETE":
      return null;

    default:
      return state;
  }
};

export const voteNotification = (content) => {
  return {
    type: "VOTED",
    data: {
      content: content,
    },
  };
};

export const createNotification = (content) => {
  return {
    type: "CREATED",
    data: {
      content: content,
    },
  };
};

export const deleteNotification = () => {
  return {
    type: "DELETE",
  };
};

export default notificationReducer;
