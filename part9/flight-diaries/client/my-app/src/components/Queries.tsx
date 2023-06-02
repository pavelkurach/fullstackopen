import { useQuery } from 'react-query';
import diariesService from '../services/diariesService';

const Queries = () => {
  const diariesQuery = useQuery('diaries', diariesService.getAllEntries);

  if (diariesQuery.isLoading) {
    return (
      <div>
        loading diaries...
      </div>
    )
  }

  if (diariesQuery.error) {
    return (
      <div>
        error loading diaries :(
      </div>
    )
  }

  const diaries = diariesQuery.data

  return (
    <div>
      {diariesQuery.data}
    </div>
  );
};

export default Queries;