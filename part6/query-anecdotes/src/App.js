import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import anecdotesService from './services/anecdotes';
import { useSetNotification } from './NotificationContext';

const App = () => {
  const setNotification = useSetNotification();

  const queryClient = useQueryClient();
  const voteMutation = useMutation(anecdotesService.vote, {
    onSuccess: (updatedAnecdote) => {
      setNotification(`you voted '${updatedAnecdote.content}'`);
      const anecdotes = queryClient.getQueryData('anecdotes');
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      queryClient.setQueryData('anecdotes', updatedAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id);
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
