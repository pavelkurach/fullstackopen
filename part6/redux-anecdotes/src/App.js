import AnectodeForm from './components/AnectodeForm';
import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <AnectodeForm />
    </div>
  );
};

export default App;
