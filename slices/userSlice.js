import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
};

export const addSection = createAsyncThunk(
  'user/addSection',
  async ({ sectionData, userId }) => {
    console.log(userId);
    try {
      const res = await axios.post(`/api/user/section`, sectionData);
      const { data } = res;
      console.log(data);
      return data;
    } catch (e) {
      return { message: e.message };
    }
  }
);

export const deleteSection = createAsyncThunk(
  'user/deleteSection',
  async sectionId => {
    try {
      const res = await axios.delete(
        `/api/user/section?sectionId=${sectionId}`
      );
      console.log(res);
      return sectionId;
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
    addSectionSuccess: (state, action) => {
      const sectionData = action.payload;
      state.user.sections.push(sectionData);
    },
    deleteUserSuccess: (state, action) => {
      const sectionId = action.payload;
      state.user.sections.filter(section => section._id !== sectionId);
    },
  },
  extraReducers(builder) {
    builder.addCase(addSection.fulfilled, (state, action) => {
      userSlice.caseReducers.addSectionSuccess(state, action);
    });
    builder.addCase(deleteSection.fulfilled, (state, action) => {
      userSlice.caseReducers.deleteUserSuccess(state, action);
    });
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
