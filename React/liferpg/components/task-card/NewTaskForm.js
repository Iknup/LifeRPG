import { Fragment } from 'react';
import MyCalendar from '../Calendar';

const NewTaskForm = () => {
  return (
    <Fragment>
      <form>
        <label>What do you want to level up in your life?</label>
        <input></input>
        <label></label>
        <input></input>
        <button></button>
      </form>
      <MyCalendar />
    </Fragment>
  );
};

export default NewTaskForm;
