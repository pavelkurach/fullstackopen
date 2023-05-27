import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export default blogsSlice.reducer;

const getAllBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(blogsSlice.actions.setBlogs(response));
  };
};

const createBlog = (blog, token) => {
  return async (dispatch) => {
    const response = await blogService.create(blog, token);
    dispatch(blogsSlice.actions.addBlog(response));
  };
};

export { getAllBlogs, createBlog };
