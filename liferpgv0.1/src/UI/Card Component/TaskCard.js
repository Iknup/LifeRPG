import classes from './TaskCard.module.css';

const TaskCard = function (props) {
  const style = `${classes.card} ${props.className}`;
  return <div className={style}>{props.children}</div>;
};

export default TaskCard;
