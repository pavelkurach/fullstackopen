import { useDispatch } from 'react-redux';
import anecdoteService from '../services/anecdotes';

const AnectodeForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdoteSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const createdAnecdote = await anecdoteService.createNew(anecdote);
    console.log(createdAnecdote);
    dispatch({ type: 'anecdotes/addAnecdote', payload: createdAnecdote });
    dispatch({
      type: 'notification/setNotification',
      payload: `You added new anecdote: ${anecdote}`,
    });
    setTimeout(() => {
      dispatch({ type: 'notification/setNotification', payload: '' });
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdoteSubmit}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnectodeForm;
