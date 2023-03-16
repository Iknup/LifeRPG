import TaskList from './taskList';
import classes from './taskListCard.module.css';

const TaskListCard = function (props) {
  return (
    <section className={classes['tasklist-card']}>
      <header className={classes.header}>
        <h2>Daily Quest(s)</h2>
        <nav>
          <a href="#">직업</a>
          <a href="#">레벨별</a>
        </nav>
      </header>
      <TaskList />
    </section>
  );
};

export default TaskListCard;
