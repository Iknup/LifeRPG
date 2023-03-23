import NewTaskForm from '../newtask/newTaskForm';

import classes from './navBarCard.module.css';

const NavBarCard = function () {
  return (
    <section className={classes.navBar}>
      <header>
        <h3>Life RPG</h3>
      </header>
    </section>
  );
};

export default NavBarCard;
