import axios from 'axios';
import { parseDiary, Diary } from '../types/diary';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllEntries = async (): Promise<Diary[]> => {
  const diaries = await axios.get(baseUrl);
  return diaries.data.map((obj: unknown) => parseDiary(obj));
};

export default { getAllEntries };