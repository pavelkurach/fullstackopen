import AnectodeForm from './components/AnectodeForm';
import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useEffect } from 'react';
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch({ type: 'anecdotes/setAnecdotes', payload: anecdotes });
    });
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnectodeForm />
    </div>
  );
};

export default App;
