import axios from "axios";

const baseUrl = "/api/blogs/comments";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const create = async (newObject, blogId) => {
  const response = await axios.post(`/api/blogs/${blogId}/comments`, newObject);
  return response.data;
};

export default { getAll, create };
