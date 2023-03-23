import classes from './box.module.css';

const Box = function (props) {
  return <div className={classes.box}>{props.children}</div>;
};

export default Box;
