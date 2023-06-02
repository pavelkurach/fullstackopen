import React, { useState } from 'react';
import { Visibility, Weather } from '../types/diary';
import diariesService from '../services/diariesService';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';

const resetForm = (target: EventTarget & {
  date: { value: string };
  visibility: { value: Visibility };
  weather: { value: Weather };
  comment: { value: string }
}) => {
  target.date.value = '';
  target.visibility.value = Object.values(Visibility)[0];
  target.weather.value = Object.values(Weather)[0];
  target.comment.value = '';
};

const DiaryForm = () => {

  const queryClient = useQueryClient();
  const [notification, setNotification] = useState('');

  const showNotification = (newNotification: string) => {
    setNotification(newNotification);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const diariesMutation = useMutation(diariesService.addNewDiary, {
    onSuccess: () => {
      queryClient.invalidateQueries('diaries');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        showNotification(error.response?.data);
      }
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as EventTarget & {
      date: { value: string },
      visibility: { value: Visibility },
      weather: { value: Weather },
      comment: { value: string },
    };
    const newDiary = {
      date: target.date.value,
      visibility: target.visibility.value,
      weather: target.weather.value,
      comment: target.comment.value
    };
    console.log(newDiary);
    diariesMutation.mutate(newDiary);
    resetForm(target);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div style={{ color: 'red' }}>{notification}</div>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          date
          <input type='date' name='date' />
        </label>
        <br />
        <label>
          visibility
          {' '}
          {Object.values(Visibility).map(v => {
            return (
              <label key={v}>
                {v}
                <input type='radio' value={v} name='visibility' />
              </label>
            );
          })}
        </label>
        <br />
        <label>
          weather
          {' '}
          {Object.values(Weather).map(v => {
            return (
              <label key={v}>
                {v}
                <input type='radio' value={v} name='weather' />
              </label>
            );
          })}
        </label>
        <br />
        <label>
          comment
          <input type='text' name='comment' />
        </label>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default DiaryForm;