import { useState } from 'react';
import TaskDropDownCard from '../UI/TaskDropDownCard';
import SubTask from './sub-task/SubTask';
import TaskStatus from './TaskStatus';
import DropAnimation from '../animation/DropAnimation';
import SubTaskIcon from '@/icons/jsx/SubTaskIcon';
import TaskGraph from '@/icons/jsx/TaskGraph';

const TaskDropDown = props => {
  const { statusData } = props;
  const [isSubTask, setIsSubTask] = useState(statusData.hasSubTask);

  return (
    <DropAnimation>
      <TaskDropDownCard className={isSubTask ? 'h-fit' : 'h-[160px]'}>
        <div className="flex justify-end mx-3 pt-[6px]">
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
        {isSubTask ? (
          <SubTask taskId={statusData.taskId} hasSubTask={statusData.hasSubTask} />
        ) : (
          <TaskStatus statusData={statusData} />
        )}
      </TaskDropDownCard>
    </DropAnimation>
  );
};

export default TaskDropDown;
