import axios from 'axios';
import { parseDiary, Diary } from '../types/diary';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllEntries = async (): Promise<Diary[]> => {
  const diaries = await axios.get(baseUrl);
  return diaries.data.map((obj: unknown) => parseDiary(obj));
};

const addNewDiary = async (newDiary: unknown): Promise<Diary> => {
  const response = await axios.post(baseUrl, newDiary);
  const createdDiary = parseDiary(response.data)
  return createdDiary
}

export default { getAllEntries, addNewDiary };