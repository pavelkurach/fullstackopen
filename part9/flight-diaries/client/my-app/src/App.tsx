import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Queries from './components/Queries';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Queries />
      </div>
    </QueryClientProvider>
  );
}

export default App;
