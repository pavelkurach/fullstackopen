import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllEntries = async () => {
  const diaries = await axios.get(baseUrl);
  return diaries.data;
};

export default { getAllEntries };