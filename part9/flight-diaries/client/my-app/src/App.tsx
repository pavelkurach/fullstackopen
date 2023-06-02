import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <DiaryForm />
        <Diaries />
      </div>
    </QueryClientProvider>
  );
}

export default App;
