import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdotesReducer';

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch({
      type: 'notification/setNotification',
      payload: `You voted for: ${anecdote.content}`,
    });
    setTimeout(() => {
      dispatch({ type: 'notification/setNotification', payload: '' });
    }, 5000);
  };

  return (
    <div>
      {anecdotes
        .filter((anecdote) => anecdote.content.includes(filter))
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Anecdotes;
