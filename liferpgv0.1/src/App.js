import { Fragment } from 'react';

import TaskProvider from './store/taskProvider';
import NavBarCard from './components/navBar/navBarCard';
import TaskListCard from './components/taskList/taskListCard';

function App() {
  return (
    <TaskProvider>
      <NavBarCard />
      <TaskListCard />
    </TaskProvider>
  );
}

export default App;
