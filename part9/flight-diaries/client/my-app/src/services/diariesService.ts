import axios from 'axios';
import { Diary, parseDiary } from '../types/diary';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllEntries = async (): Promise<Diary[]> => {
  const diaries = await axios.get(baseUrl);
  return diaries.data.map((obj: unknown) => parseDiary(obj));
};

const addNewDiary = async (newDiary: unknown): Promise<Diary> => {
  const response = await axios.post(baseUrl, newDiary);
  return parseDiary(response.data);
};

export default { getAllEntries, addNewDiary };