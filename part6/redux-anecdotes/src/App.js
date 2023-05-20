import { useSelector, useDispatch } from 'react-redux';
import { vote } from './reducers/anecdoteReducer';
import AnectodeForm from './components/AnectodeForm';
import Anecdotes from './components/Anecdotes';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <AnectodeForm />
    </div>
  );
};

export default App;
