import { createSlice } from '@reduxjs/toolkit';

const notificationStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    status: '',
  },
  reducers: {
    setNotification: (state, action) => {
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    },
  },
});

export default notificationSlice.reducer;

const setNotification = (message, status) => {
  return {
    type: 'notification/setNotification',
    payload: {
      message,
      status,
    },
  };
};

const deleteNotification = () => {
  return {
    type: 'notification/setNotification',
    payload: {
      message: '',
      status: '',
    },
  };
};

const showNotification = (message, status) => {
  return async (dispatch) => {
    dispatch(setNotification(message, status));
    setTimeout(() => {
      dispatch(setNotification('', ''));
    }, 2000);
  };
};

export { notificationStatus, showNotification };
