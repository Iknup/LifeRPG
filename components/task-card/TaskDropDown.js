import { useState } from 'react';
import TaskDropDownCard from '../UI/TaskDropDownCard';
import SubTask from './SubTask';
import TaskStatus from './TaskStatus';
import DropAnimation from '../animation/DropAnimation';
import SubTaskIcon from '@/icons/jsx/SubTaskIcon';
import TaskGraph from '@/icons/jsx/TaskGraph';

const TaskDropDown = props => {
  const [isSubTask, setIsSubTask] = useState(true);
  const { statusData } = props;

  return (
    <DropAnimation>
      <TaskDropDownCard>
        <div className="flex justify-end mx-3 pt-1">
          <button
            onClick={() => {
              setIsSubTask(true);
            }}
            className="mr-1"
          >
            <SubTaskIcon />
          </button>
          <button
            onClick={() => {
              setIsSubTask(false);
            }}
          >
            <TaskGraph />
          </button>
        </div>
        {isSubTask ? <SubTask /> : <TaskStatus statusData={statusData} />}
      </TaskDropDownCard>
    </DropAnimation>
  );
};

export default TaskDropDown;
