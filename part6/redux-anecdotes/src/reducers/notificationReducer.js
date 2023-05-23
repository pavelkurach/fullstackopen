import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
};

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return { content: action.payload };
    },
  },
});

export const { setNotification } = notificationReducer.actions;
export default notificationReducer.reducer;

export const showNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, time * 1000);
  };
};
