import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import commentsReducer from "./reducers/commentsReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer,
  comments: commentsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
