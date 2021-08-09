import blogServices from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;

    case "LIKE":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
  }
  return state;
};

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogServices.getAll();
  dispatch({
    type: "INIT_BLOGS",
    data: blogs,
  });
};

export const deleteBlog = (blogId) => async (dispatch) => {
  await blogServices.remove(blogId);

  const blogs = await blogServices.getAll();
  dispatch({
    type: "INIT_BLOGS",
    data: blogs,
  });
};

export const likeBlog = (likedBlog) => async (dispatch) => {
  const { title, author, url, likes, id } = likedBlog;
  const updatedBlog = {
    title,
    author,
    url,
    likes: likes + 1,
    id,
  };

  const response = await blogServices.update(updatedBlog, likedBlog.id);
  dispatch({
    type: "LIKE",
    data: response,
  });
};

export default blogReducer;
