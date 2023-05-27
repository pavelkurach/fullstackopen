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
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
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

const deleteBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, token);
    dispatch(blogsSlice.actions.deleteBlog(id));
  };
};

const likeBlog = (blog, token) => {
  return async (dispatch) => {
    const newBlog = { likes: blog.likes + 1 };
    await blogService.update(blog.id, newBlog, token);
    dispatch(blogsSlice.actions.likeBlog(blog.id));
  };
};

export { getAllBlogs, createBlog, deleteBlog, likeBlog };
