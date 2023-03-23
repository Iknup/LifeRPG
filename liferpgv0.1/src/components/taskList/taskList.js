import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { AiOutlineCaretDown } from 'react-icons/ai';

import { taskActions } from '../../store/task-slice';
import classes from './taskList.module.css';
import TaskItem from './taskItem';
import ClearedTaskItem from './clearedTaskItem';
import NewTaskForm from '../newtask/newTaskForm';

const TaskList = function (props) {
  // states and context
  const dispatch = useDispatch();
  const taskLists = useSelector(state => state.tasks.tasks);
  const unclearedTasks = taskLists.filter(task => task.isCleared === false);

  const [showForm, setShowForm] = useState(false);

  // Btn toggle
  const showFormHandler = function () {
    setShowForm(prev => !prev);
  };

  // Dispatch: increasing generated amount by 1
  // dispatch(taskActions.renderPrep());

  // Rendering Task items

  const taskItemMarkup = unclearedTasks.map(task => {
    return <TaskItem task={task} key={task.id} />;
  });

  // Checking Cleared Task Items
  useEffect(() => {
    dispatch(taskActions.renderPrep());
  }, []);

  const clearedTasks = taskLists.filter(task => {
    return task.isCleared === true;
  });

  let clearedTasksMarkup;

  // Rendering Cleared Tasks
  if (clearedTasks) {
    clearedTasksMarkup = clearedTasks.map(task => {
      return <ClearedTaskItem task={task} key={task.id} />;
    });
  }

  return (
    <section className={classes.tasklist}>
      <header>
        <p>List new quest.</p>
        <button onClick={showFormHandler} className={classes.button}>
          <AiOutlineCaretDown />
        </button>
      </header>
      {showForm && <NewTaskForm showForm={showFormHandler} />}
      {taskItemMarkup}
      {clearedTasksMarkup}
    </section>
  );
};

export default TaskList;
