import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from 'react-query';
import anecdotesService from './services/anecdotes';

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const anecdotesQuery = useQuery('anecdotes', anecdotesService.getAll, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (anecdotesQuery.isLoading) {
    return <div>loading data...</div>;
  }

  if (anecdotesQuery.isError) {
    return (
      <span>anecdotes service is not available due to problems in server</span>
    );
  }

  const anecdotes = anecdotesQuery.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
