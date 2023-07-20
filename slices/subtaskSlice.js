import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  subtaskWrappers: [],
  error: null,
};

export const addSubTask = createAsyncThunk(
  'subtask/addSubTask',
  async ({ subTaskdata, hasTask }) => {
    try {
      const res = await axios.post('api/subtask', subTaskdata);
      const { data } = res;

      return { data, hasTask };
    } catch (e) {
      return { message: e.message };
    }
  }
);

export const getSubtask = createAsyncThunk(
  'subtask/getSubtask',
  async taskId => {
    try {
      const res = await axios.get(`api/subtask?parentId=${taskId}`);
      const { data } = res;
      return { data, taskId };
    } catch (e) {
      return { message: e.message };
    }
  }
);

export const deleteSubtask = createAsyncThunk(
  'subtask/deleteSubtask',
  async ({ subtaskId, parentId }) => {
    try {
      const res = await axios.delete(`api/subtask?subtaskId=${subtaskId}`);
      const { data } = res;
      return { data, subtaskId, parentId };
    } catch (e) {
      return { message: e.message };
    }
  }
);

export const editSubtask = createAsyncThunk(
  'subtask/editSubtask',
  async ({ subtaskData, parentId }) => {
    try {
      const res = await axios.patch(
        `api/subtask/${subtaskData._id}`,
        subtaskData
      );
      const { data } = res;
      return { data, parentId };
    } catch (e) {
      return { message: e.message };
    }
  }
);

const subtaskSlice = createSlice({
  name: 'subtask',
  initialState,
  reducers: {
    addSubtaskSuccess(state, action) {
      const { data: subtaskData, hasTask } = action.payload;
      console.log(hasTask);

      if (hasTask) {
        const subtaskWrapper = state.subtaskWrappers.find(
          subtaskWrapper => subtaskWrapper.parentId === subtaskData.parentTask
        );
        subtaskWrapper.subtasks.push(subtaskData);
      } else {
        state.subtaskWrappers.push({
          parentId: subtaskData.parentId,
          subtasks: [subtaskData],
        });
      }
    },
    getSubtaskSuccess(state, action) {
      const subTaskData = action.payload.data;
      state.subtaskWrappers.push({
        parentId: action.payload.taskId,
        subtasks: [...subTaskData],
      });
    },
    deleteSubtaskSuccess(state, action) {
      const { subtaskId, parentId } = action.payload;

      const subtasksWrapper = state.subtaskWrappers.find(
        subtaskWrapper => subtaskWrapper.parentId === parentId
      );

      if (subtasksWrapper) {
        subtasksWrapper.subtasks = subtasksWrapper.subtasks.filter(
          subtask => subtask._id !== subtaskId
        );
        if (subtasksWrapper.subtasks.length === 0) {
          state.subtaskWrappers = state.subtaskWrappers.filter(
            subtaskWrapper => subtaskWrapper.parentId !== parentId
          );
        }
      }
    },
    editSubtaskSuccess(state, action) {
      const { data: subtaskData, parentId } = action.payload;

      const subtaskWrapper = state.subtaskWrappers.find(
        subtaskWrapper => subtaskWrapper.parentId === parentId
      );

      const updateSubtaskIndex = subtaskWrapper.subtasks.findIndex(
        subtask => subtask._id === subtaskData._id
      );

      subtaskWrapper.subtasks[updateSubtaskIndex] = subtaskData;
    },
  },
  extraReducers(builder) {
    builder.addCase(addSubTask.fulfilled, (state, action) => {
      subtaskSlice.caseReducers.addSubtaskSuccess(state, action);
    });
    builder.addCase(getSubtask.fulfilled, (state, action) => {
      subtaskSlice.caseReducers.getSubtaskSuccess(state, action);
    });
    builder.addCase(deleteSubtask.fulfilled, (state, action) => {
      subtaskSlice.caseReducers.deleteSubtaskSuccess(state, action);
    });
    builder.addCase(editSubtask.fulfilled, (state, action) => {
      subtaskSlice.caseReducers.editSubtaskSuccess(state, action);
    });
  },
});

export const subTaskActions = subtaskSlice.actions;

export default subtaskSlice.reducer;
