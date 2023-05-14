import TaskCard from '../../UI/Card Component/TaskCard';
import classes from './clearedTaskItem.module.css';

const ClearedTaskItem = function (props) {
  const { task } = props;
  const { levelData } = task;

  return (
    <TaskCard className={classes.task}>
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
        <p>{`${task.clearedAmount}/${task.generatedAmount}`}</p>
      </div>
    </TaskCard>
  );
};

export default ClearedTaskItem;
