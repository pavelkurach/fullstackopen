import { useDispatch } from 'react-redux';
import { addAnectode } from '../reducers/anecdotesReducer';

const AnectodeForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdoteSubmit = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(addAnectode(anecdote));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdoteSubmit}>
        <div>
          <input type='text' name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnectodeForm;
