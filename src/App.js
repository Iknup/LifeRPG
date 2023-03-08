import logo from './logo.svg';
import { useState } from 'react';
import AddNewTask from './components/addnewtask/AddNewTask';
import TaskListRender from './components/taskList/TaskListRender';

import './App.css';
function App() {
  const [tasks, setTasks] = useState([]);

  const addNewTaskHandler = function (taskTitle, taskDesc) {
    setTasks(prev => [
      {
        title: taskTitle,
        description: taskDesc,
        id: Math.random().toString(),
      },
      ...prev,
    ]);
  };

  return (
    <div>
      <AddNewTask onSubmit={addNewTaskHandler} />
      <TaskListRender task={tasks} />
    </div>
  );
}

export default App;
