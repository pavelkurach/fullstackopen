import { useMutation, useQueryClient } from 'react-query';
import anecdotesService from '../services/anecdotes';
import { useSetNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const setNotification = useSetNotification();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(anecdotesService.createNew, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);
      setNotification(`you added anecdote: ${newAnecdote.content}`);
    },
    onError: (error) => {
      setNotification('too short anecdote, must have length 5 or more');
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
