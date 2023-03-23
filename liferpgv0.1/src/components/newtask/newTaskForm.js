import { useDispatch } from 'react-redux';
import { taskActions } from '../../store/task-slice';

import useInput from '../../hooks/use-input';
import FormButton from '../../UI/Button/formbutton';
import TaskCard from '../../UI/Card Component/TaskCard';
import classes from './newTaskForm.module.css';

const NewTaskForm = function (props) {
  const dispatch = useDispatch();

  // useInput Hooks
  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleHasError,
    changeInputHandler: titleInputHandler,
    onblurHandler: titleOnblurHandler,
    reset: resetTitle,
  } = useInput(true, value => value.trim().length !== 0);

  const {
    value: enteredDescrip,
    changeInputHandler: descripInputHandler,
    onblurHandler: descripOnblurHandler,
    reset: resetDescrip,
  } = useInput(false);

  // Setting and switching ValidFrom
  let validForm = false;
  if (titleIsValid) validForm = true;

  const newTaskSubmitHandler = function (e) {
    e.preventDefault();

    if (!validForm) return;

    const task = {
      title: enteredTitle,
      description: enteredDescrip,
      initDate: Date(),
      clearedAmount: 0,
      generatedAmount: 1, // Change to 0 after backend is set
      id: Math.random().toString(),
    };

    dispatch(taskActions.addTask(task));

    resetTitle();
    resetDescrip();
  };

  const showFormHandler = function () {
    props.showForm();
  };

  const titleClassName = titleHasError ? classes.invalid : '';

  return (
    <TaskCard className={classes['new-task']}>
      <form onSubmit={newTaskSubmitHandler}>
        <h3>Make a new Quest!</h3>
        <div className={classes['new-title']}>
          <label>Quest</label>
          <input
            className={titleClassName}
            type="text"
            id="title"
            value={enteredTitle}
            placeholder={titleHasError ? 'Please enter a valid name....' : ''}
            onChange={titleInputHandler}
            onBlur={titleOnblurHandler}
          />
        </div>
        <div className={classes['new-descrip']}>
          <label>Quest script</label>
          <input
            type="text"
            id="description"
            onChange={descripInputHandler}
            value={enteredDescrip}
          />
        </div>
        <div className={classes.button}>
          <div className={classes.buttonYes}>
            <button disabled={!validForm}>Add</button>
          </div>
          <div className={classes.buttonNo}>
            <button onClick={showFormHandler}>Cancel</button>
          </div>
        </div>
      </form>
    </TaskCard>
  );
};

export default NewTaskForm;
