import TaskInfo from './TaskInfo';
import TaskEdit from './TaskEdit';
import TaskCardAnimation from '../animation/TaskCardAnimation';
import { useState } from 'react';

const TaskCard = props => {
  const [isEdit, setIsEdit] = useState(false);
  // const [task, setTask] = useState(props.task);

  const taskEditHandler = () => {
    setIsEdit(!isEdit);
  };

  // const getUpdatedTaskHandler = data => {
  //   setTask(data);
  //   console.log(task);
  // };

  const JSXcontents = !isEdit ? (
    <TaskInfo task={props.task} taskEditHandler={taskEditHandler} />
  ) : (
    <TaskEdit
      task={props.task}
      taskEditHandler={taskEditHandler}
      // getUpdatedTaskHandler={getUpdatedTaskHandler}
    />
  );
  return <TaskCardAnimation>{JSXcontents}</TaskCardAnimation>;
};

export default TaskCard;
