import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;

const setUser = (user) => {
  return async (dispatch) => {
    dispatch(userSlice.actions.setUser(user));
  };
};

export { setUser };
