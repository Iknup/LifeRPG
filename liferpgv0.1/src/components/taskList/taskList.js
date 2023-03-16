import { useContext } from 'react';

import classes from './taskList.module.css';
import TaskItem from './taskItem';
import TaskContext from '../../store/task-context';

const TaskList = function (props) {
  // Getting an tasks from TaskContext
  const taskCtx = useContext(TaskContext);
  const { tasks } = taskCtx;

  // Rendering Task items
  const taskItemMarkup = tasks.map(task => {
    return <TaskItem task={task} key={task.id} />;
  });

  return <section className={classes.tasklist}>{taskItemMarkup}</section>;
};

export default TaskList;
