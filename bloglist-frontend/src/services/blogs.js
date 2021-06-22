import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const blogArray = response.data;
  const sortedBlogArray = blogArray.sort((a, b) => b.likes - a.likes);
  return sortedBlogArray;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedObject, blogId) => {
  const response = await axios.put(`/api/blogs/${blogId}`, updatedObject);
  return response.data;
};

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`/api/blogs/${blogId}`, config);
  console.log(request);
};

export default { getAll, create, setToken, update, remove };
