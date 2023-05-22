import AnectodeForm from './components/AnectodeForm';
import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
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
