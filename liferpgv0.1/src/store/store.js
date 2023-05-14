import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './task-slice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;

// const initialState = {
//   tasks: DUMMY_DATA,
//   clearedTasks: [],
//   //   addTask: task => {},
//   //   removeTask: id => {},
//   //   clearTask: id => {},
// };

// const reducer = function (state = initialState, action) {
//   let updatedTask = [...state.tasks];
//   let updatedClearedTask = [];
//   const taskFinder = function (id) {
//     const targetTask = updatedTask.find(task => task.id === id);
//     const targetTaskIndex = updatedTask.indexOf(targetTask);

//     return targetTaskIndex;
//   };
//   switch (action.type) {
//     case 'add_task': {
//       updatedTask.concat(action.task);
//       return { tasks: updatedTask, clearedTasks: updatedClearedTask };
//     }
//     case 'remove_task': {
//       const targetTask = taskFinder(action.id);
//       updatedTask.splice(targetTask, 1);
//       return { tasks: updatedTask, ...state };
//     }
//     case 'clear_task': {
//       const [targetTask] = updatedTask.splice(taskFinder(action.id), 1);
//       targetTask.clearedAmount += 1;
//       updatedClearedTask = [...state.clearedTasks].concat(targetTask);
//       console.log(updatedClearedTask, updatedTask, targetTask);
//       return { tasks: updatedTask, clearedTasks: updatedClearedTask };
//     }
//     default:
//       return state;
//   }
// };

// const store = createStore(reducer);
