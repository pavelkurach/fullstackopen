import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Diaries from './components/Diaries';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Diaries />
      </div>
    </QueryClientProvider>
  );
}

export default App;
