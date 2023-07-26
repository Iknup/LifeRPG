import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
};

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ data, userId }) => {
    try {
      console.log(data);
      const res = await axios.patch(`/api/user?userId=${userId}`, data);
      const userData = res.data;
      return userData;
    } catch (e) {
      return { message: e.message };
    }
  }
);

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

export const editSection = createAsyncThunk(
  'user/editSection',
  async sectionData => {
    try {
      const res = await axios.patch(
        `/api/user/section?sectionId=${sectionData._id}`,
        { title: sectionData.title }
      );

      console.log(res);

      const { data } = res;

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
      const updatedSections = state.user.sections.filter(
        section => section._id !== sectionId
      );
      state.user.sections = updatedSections;
    },
    editSectionSuccess: (state, action) => {
      const sectionData = action.payload;
      const section = state.user.sections.find(
        section => section._id === sectionData._id
      );
      section.title = sectionData.title;
    },
    editUserSuccess: (state, action) => {
      const userData = action.payload;
      const sections = state.user.sections;
      state.user = { ...userData, sections };
    },
  },
  extraReducers(builder) {
    builder.addCase(addSection.fulfilled, (state, action) => {
      userSlice.caseReducers.addSectionSuccess(state, action);
    });
    builder.addCase(deleteSection.fulfilled, (state, action) => {
      userSlice.caseReducers.deleteUserSuccess(state, action);
    });
    builder.addCase(editSection.fulfilled, (state, action) => {
      userSlice.caseReducers.editSectionSuccess(state, action);
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      userSlice.caseReducers.editUserSuccess(state, action);
    });
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
