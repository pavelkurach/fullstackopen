import axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () =>
  axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => {
      console.warn(error);
    });

const deletePerson = id =>
  axios.delete(`${baseUrl}/${id}`).catch(error => {
    if (error instanceof AxiosError) {
      console.error(error.message);
    } else {
      throw error;
    }
  });

export default {
  getAll,
  deletePerson,
};
