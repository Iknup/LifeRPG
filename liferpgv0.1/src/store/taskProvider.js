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

const defaultTaskState = {
  tasks: DUMMY_DATA,
};

const taskReducer = function (state, action) {
  let updatedTasksList = [];
  if (action.type === 'ADD_TASK') {
    return (updatedTasksList = state.tasks.concat(action.item));
  }
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

  const taskContext = {
    tasks: taskState.tasks,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
  };

  return (
    <TaskContext.Provider value={taskContext}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
