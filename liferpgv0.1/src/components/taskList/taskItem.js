import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../store/task-slice';

import TaskCard from '../../UI/Card Component/TaskCard';
import classes from './taskItem.module.css';

const TaskItem = function (props) {
  const dispatch = useDispatch();
  const { task } = props;
  const { levelData } = task;
  console.log(levelData);

  // Get Task's level

  const clearTaskHandler = function () {
    dispatch(taskActions.clearTask(task.id));
  };

  return (
    <TaskCard className={classes.task}>
      <div>
        <input type="checkbox" onClick={clearTaskHandler}></input>
      </div>
      <div className={classes['task-basic-info']}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className={classes['task-detail-info']}>
        <div>lv:{levelData.level}</div>
        <p>
          exp:{levelData.exp}/{levelData.nextLevel}
        </p>
        <p>clr:{task.clearedRate}%</p>
        <p>
          {task.clearedAmount}/{task.generatedAmount}
        </p>
      </div>
    </TaskCard>
  );
};

export default TaskItem;
