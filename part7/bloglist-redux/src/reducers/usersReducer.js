import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export default usersSlice.reducer;

const getAllUsers = () => {
  return async (dispatch) => {
    const response = await usersService.getAll();
    dispatch(usersSlice.actions.setUsers(response));
  };
};

export { getAllUsers };
