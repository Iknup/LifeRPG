import TaskInfo from './TaskInfo';
import TaskEdit from './TaskEdit';
import TaskCardAnimation from '../animation/TaskCardAnimation';
import { useState } from 'react';
import { ItemTypes } from '@/src/graphql/dnd/item-types';
import { useDrag } from 'react-dnd';

const TaskCard = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: props.task._id, section: props.task.section },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
  return (
    <TaskCardAnimation>
      <div ref={drag}>{JSXcontents}</div>
    </TaskCardAnimation>
  );
};

export default TaskCard;
