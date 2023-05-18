import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const tokenConfig = token => `Bearer ${token}`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: tokenConfig(token) },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
