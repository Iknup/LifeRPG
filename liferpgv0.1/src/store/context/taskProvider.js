import { useReducer } from 'react';

import TaskContext from './task-context';

const DUMMY_DATA = [
  {
    id: 't1',
    title: '운동',
    description: '하루에 1시간씩',
    initDate: new Date(2023, 2, 3),
    type: 'daily',
    generatedAmount: 13,
    clearedAmount: 10,
  },
  {
    id: 't2',
    title: 'React 공부',
    description: '하루에 4시간씩',
    initDate: new Date(2023, 1, 1),
    type: 'daily',
    generatedAmount: 43,
    clearedAmount: 40,
  },
];

// Making Copy of Task Array
const DUMMY_DATA_COPY = [].concat(DUMMY_DATA);

const defaultTaskState = {
  tasks: DUMMY_DATA_COPY,
  clearedTask: [],
};

const taskReducer = function (state, action) {
  let updatedTasksList = [];
  let updatedClearedTasksList = [];
  // Adding new task

  if (action.type === 'ADD_TASK') {
    updatedTasksList = state.tasks.concat(action.item);
    return {
      tasks: updatedTasksList,
      clearedTask: state.clearedTask,
    };
  }
  // Cleared task handling
  if (action.type === 'CLEAR_TASK') {
    // Finding the cleared task
    const clearedTask = state.tasks.find(task => task.id === action.id);
    const clearedTaskIndex = state.tasks.indexOf(clearedTask);

    // Changing value
    clearedTask.clearedAmount += 1;
    console.log(clearedTask.clearedAmount);

    // Adding cleared task to clearedTask Array
    updatedClearedTasksList = state.clearedTask.concat(clearedTask);

    // Deleting cleared task from arrray
    updatedTasksList = updatedTasksList.concat(state.tasks);
    updatedTasksList.splice(clearedTaskIndex, 1);

    return {
      tasks: updatedTasksList,
      clearedTask: updatedClearedTasksList,
    };
  }

  return {
    tasks: DUMMY_DATA_COPY,
    clearedTask: [],
  };
};

const TaskProvider = function (props) {
  const [taskState, dispatchTaskAction] = useReducer(
    taskReducer,
    defaultTaskState
  );

  const addTaskHandler = function (task) {
    dispatchTaskAction({ type: 'ADD_TASK', item: task });
  };

  const removeTaskHandler = function (id) {
    dispatchTaskAction({ type: 'REMOVE_TASK', id: id });
  };

  const clearTaskHandler = function (id) {
    dispatchTaskAction({ type: 'CLEAR_TASK', id: id });
  };

  const taskContext = {
    tasks: taskState.tasks,
    clearedTask: taskState.clearedTask,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    clearTask: clearTaskHandler,
  };

  return (
    <TaskContext.Provider value={taskContext}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
