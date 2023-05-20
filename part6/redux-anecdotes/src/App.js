import { useSelector, useDispatch } from 'react-redux';
import { vote } from './reducers/anecdoteReducer';
import { AnectodeForm } from './components/AnectodeForm';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

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
      <AnectodeForm />
    </div>
  );
};

export default App;
