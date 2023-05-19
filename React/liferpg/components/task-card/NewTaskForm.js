import { Fragment } from 'react';
import MyCalendar from '../Calendar';
import { useState } from 'react';

const NewTaskForm = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const btnArrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );

  const btnArrowUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );

  return (
    <div className="bg-black max-w-screen-md">
      <form>
        <label>What do you want to level up in your life?</label>
        <input></input>
        <button>Submit</button>
      </form>
      <button
        onClick={() =>
          setShowCalendar(prevState => {
            setShowCalendar(!prevState);
          })
        }
      >
        {!showCalendar ? btnArrowDown : btnArrowUp}
      </button>
      {showCalendar && <MyCalendar />}
    </div>
  );
};

export default NewTaskForm;
