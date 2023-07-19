import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  error: null,
};

export const editTask = createAsyncThunk(
  'tasks/editTask',
  //taskData as an object, isEdit(boolean) true for editing false for clear
  async ({ taskData, isEdit }) => {
    try {
      const { taskId } = taskData;
      console.log(taskData, taskId);
      const response = await axios.patch(`/api/task/${taskId}`, {
        taskData,
        isEdit,
      });
      return response.data;
    } catch (e) {
      return { message: e.message };
    }
  }
);

export const addTask = createAsyncThunk('tasks/addTask', async taskData => {
  try {
    const response = await axios.post('/api/task', taskData);
    const { data } = response;
    return data;
  } catch (e) {
    return { message: e.message };
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async taskId => {
  try {
    const response = await axios.delete(`/api/task/${taskId}`);
    const { data } = response;
    return { data, taskId };
  } catch (e) {
    return { message: e.message };
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks: (state, action) => {
      const tasks = action.payload;
      state.tasks = [...tasks];
    },
    addTaskSuccess: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTasks: (state, action) => {
      const taskindex = state.tasks.findIndex(
        task => task._id === action.payload._id
      );
      const updatedTask = action.payload;
      state.tasks[taskindex] = updatedTask;
    },
    deleteTaskSuccess: (state, action) => {
      const updatedTasks = state.tasks.filter(
        task => task._id !== action.payload.taskId
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
      taskSlice.caseReducers.updateTasks(state, action);
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      taskSlice.caseReducers.addTaskSuccess(state, action);
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      taskSlice.caseReducers.deleteTaskSuccess(state, action);
    });
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;
