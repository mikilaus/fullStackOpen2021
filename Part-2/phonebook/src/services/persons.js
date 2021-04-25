import axios from "axios";
const serverUrl = "/api/persons";

export const getAll = () => {
  const request = axios.get(serverUrl);
  return request.then((response) => response.data);
};

export const create = (nameObject) => {
  const request = axios.post(serverUrl, nameObject);
  return request.then((response) => response.data);
};

export const deletePerson = (id) => {
  const request = axios.delete(`${serverUrl}/${id}`);
  return request.then((response) => response.data);
};

export const updatePerson = (id, newObject) => {
  const request = axios.put(`${serverUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
