import { useState } from 'react';

export const useField = (name) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    input: {
      name,
      value,
      onChange,
    },
    reset,
  };
};

export const useCreateAnecdote = () => {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');

  const reset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return {
    content: content.input,
    author: author.input,
    info: info.input,
    reset,
  };
};
