export enum Weather {
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Sunny = 'sunny',
}

export enum Visibility {
  Good = 'good',
  Poor = 'poor',
}

export interface Diary {
  id: number,
  date: string;
  weather: Weather,
  visibility: Visibility
}

const parseId = (id: unknown): number => {
  if (!id || !(typeof id === 'number')) {
    throw new Error('Missing or invalid id');
  }
  return id;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Missing or invalid date');
  }
  return date;
};

const isWeather = (weather: unknown): weather is Weather => {
  if (!weather || !isString(weather)) {
    return false;
  }
  return Object.values(Weather).map(w => w.toString()).includes(weather)
}

const parseWeather = (weather: unknown): Weather => {
  if (!isWeather(weather)) {
    throw new Error('Missing or invalid weather');
  }
  return weather;
};

const isVisibility = (visibility: unknown): visibility is Visibility => {
  if (!visibility || !isString(visibility)) {
    return false;
  }
  return Object.values(Visibility).map(w => w.toString()).includes(visibility)
}

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isVisibility(visibility)) {
    throw new Error('Missing or invalid visibility');
  }
  return visibility;
};

export const parseDiary = (object: unknown): Diary => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('id' in object &&
    'date' in object &&
    'weather' in object &&
    'visibility' in object) {
    const diary = {
      id: parseId(object.id),
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility)
    };
    return diary;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export interface NewDiary {
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment: string,
}



