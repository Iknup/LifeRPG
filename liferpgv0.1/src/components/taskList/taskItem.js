import classes from './taskItem.module.css';

const TaskItem = function (props) {
  const { task } = props;

  return (
    <div className={classes.task}>
      <div>
        <input type="checkbox"></input>
      </div>
      <div className={classes['task-basic-info']}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className={classes['task-detail-info']}>
        <span>List of Quest's data</span>
      </div>
    </div>
  );
};

export default TaskItem;
