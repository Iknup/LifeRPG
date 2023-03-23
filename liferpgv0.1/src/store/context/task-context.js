import React from 'react';

const TaskContext = React.createContext({
  tasks: [],
  clearedTasks: [],
  addTask: task => {},
  removeTask: id => {},
  clearTask: id => {},
});

export default TaskContext;
