export type Weather = 'rainy' | 'cloudy' | 'windy' | 'sunny';
export type Visibility = 'good' | 'poor';

export interface Diary {
  id: number,
  date: string;
  weather: Weather,
  visibility: Visibility
}
