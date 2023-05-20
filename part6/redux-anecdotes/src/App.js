import { useSelector, useDispatch } from 'react-redux';
import { vote, addAnectode } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const handleNewAnecdoteSubmit = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(addAnectode(anecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a1, a2) => a2.votes - a1.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
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

export default App;
