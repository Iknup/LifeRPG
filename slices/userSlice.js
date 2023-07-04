import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
