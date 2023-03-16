import React from 'react';

const TaskContext = React.createContext({
  tasks: [],
  addTask: task => {},
  removeTask: id => {},
  completeTask: id => {},
});

export default TaskContext;
