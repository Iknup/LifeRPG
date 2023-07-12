import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
};

export const addSection = createAsyncThunk(
  'user/addSection',
  async ({ data, userId }) => {
    try {
      const res = await axios.patch(`/api/user?userId=${userId}`, );
      const { data } = res;
      console.log(data);
      return data;
    } catch (e) {
      return { message: e.message };
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
  },
  extraReducers(builder) {
    builder.addCase(addSection.fulfilled, (state, action) => {
      userSlice.caseReducers.loadUser(state, action);
    });
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
