import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
});

export default store;
