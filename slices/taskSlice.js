import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
};

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (taskData, isEdit) => {
    try {
      const { taskID } = taskData;
      const response = await axios.patch(`api/task/${taskID}`, {
        taskData,
        isEdit,
      });
      return response.data;
    } catch (e) {
      return { message: e.message };
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks: (state, action) => {
      const tasks = action.payload;
      state.tasks = [...tasks];
    },
    addTasks: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTasks: (state, action) => {
      const taskindex = state.tasks.findIndex(
        task => task._id === action.payload._id
      );
      const updatedTask = action.payload;
      state.tasks[taskindex] = updatedTask;
    },
    deleteTasks: (state, action) => {
      const updatedTasks = state.tasks.filter(
        task => task._id !== action.payload
      );
      state.tasks = updatedTasks;
    },
    getClearRate: (state, action) => {
      const updatedTasks = state.tasks.forEach(
        task => (task.clearRate = task.timeCompleted / task.timeGenerated)
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(editTask.fulfilled, (state, action) => {
      const taskindex = state.tasks.findIndex(
        task => task._id === action.payload._id
      );
      const updatedTask = action.payload;
      state.tasks[taskindex] = updatedTask;
      console.log(updatedTask);
    });
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;
