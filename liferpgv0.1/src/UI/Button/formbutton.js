import classes from './formbutton.module.css';

const FormButton = function (props) {
  const className = `${classes.buttonYes} ${classes.active}`;
  console.log(props.buttonActive);
  return (
    <div className={classes.buttonYes}>
      <button disabled={props.buttonActive ? false : true}>
        {props.children}
      </button>
    </div>
  );
};

export default FormButton;
