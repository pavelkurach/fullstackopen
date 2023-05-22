import { useDispatch, useSelector } from 'react-redux';

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

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
              <button
                onClick={() =>
                  dispatch({
                    type: 'anecdotes/vote',
                    payload: anecdote.id,
                  })
                }
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Anecdotes;
