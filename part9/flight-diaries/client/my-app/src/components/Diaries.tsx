import { useQuery } from 'react-query';
import diariesService from '../services/diariesService';

const Diaries = () => {
  const diariesQuery = useQuery('diaries', diariesService.getAllEntries);

  if (diariesQuery.isLoading) {
    return (
      <div>
        loading diaries...
      </div>
    );
  }

  if (diariesQuery.error || diariesQuery.data === undefined) {
    return (
      <div>
        error loading diaries :(
      </div>
    );
  }

  const diaries = diariesQuery.data;

  return (
    <div>
      {diaries.map(diary => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
          </div>
        );
      })}
    </div>
  );
};

export default Diaries;