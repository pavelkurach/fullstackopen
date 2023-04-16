import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () =>
  axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });

const addPerson = person =>
  axios
    .post(baseUrl, person)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });

const updateNumber = person =>
  axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });

const deletePerson = id =>
  axios.delete(`${baseUrl}/${id}`).catch(error => {
    console.error(error);
  });

export default {
  getAll,
  addPerson,
  updateNumber,
  deletePerson,
};
