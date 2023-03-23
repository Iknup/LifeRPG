import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TaskProvider from './store/context/taskProvider';
import NavBarCard from './components/navBar/navBarCard';
import TaskListCard from './components/taskList/taskListCard';
import Box from './UI/box';
import { getLevelAction } from './store/actions/level-action';

function App() {
  // useEffect(() => {
  //   dispatch(getLevel());
  // }, [dispatch]);

  return (
    <Box>
      <NavBarCard />
      <TaskListCard />
    </Box>
  );
}

export default App;
