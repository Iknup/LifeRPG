import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice';
import subtaskReducer from './slices/subtaskSlice';
import optionReducer from './slices/optionSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
    subtasks: subtaskReducer,
    options: optionReducer,
  },
});
