import axios from "axios";

const baseUrl = "https://fso-phonebook-iopr.onrender.com/api/persons";

const getAll = () => axios.get(baseUrl).then(response => response.data);

const addPerson = person =>
  axios.post(baseUrl, person).then(response => response.data);

const updateNumber = person =>
  axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data);

const deletePerson = id => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  addPerson,
  updateNumber,
  deletePerson,
};
