import { useState, useRef } from 'react';
import axios from 'axios';
import TaskCardAnimation from '../animation/TaskCardAnimation';
import TaskFormOptions from './TaskFormOptions';
import MyCalendar from '../Calendar';
import { TaskClass } from '../../classes/TaskClass';
import { taskActions } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';

const NewTaskForm = props => {
  const [showOptions, setShowOptions] = useState(false);
  const descriptionRef = useRef();
  const [selectedDays, setSelectedDays] = useState([]);
  const [options, setOptions] = useState({});
  const dispatch = useDispatch();

  const btnArrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="ml-2 w-5 h-5"
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
      className="ml-2 w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );

  const getDaysHandler = days => {
    // make a limit of the repeating days
    setSelectedDays(days);
  };

  const getOptionHandler = options => {
    setOptions(options);
    setShowOptions(prevState => setShowOptions(!prevState));
  };

  const submitTaskHandler = async e => {
    e.preventDefault();
    const descriptionValue = descriptionRef.current.value;
    const { repeat, isRPG } = options;
    const selectedDaysInteger = selectedDays?.map(day => day.getDay());
    let taskOptions = {};

    if (repeat !== 'None') {
      if (isRPG) {
        taskOptions = {
          level: 1,
          experience: 0,
          selectedDays: selectedDaysInteger,
        };
      } else {
        taskOptions = {
          selectedDays: selectedDaysInteger,
        };
      }
    }

    const newTask = {
      description: descriptionValue,
      repeat,
      isRPG,
      ...taskOptions,
    };

    if (newTask.repeat !== 'None') {
      Object.setPrototypeOf(newTask, TaskClass.prototype);
      newTask.setResetHandler();
    }

    const taskData = await axios.post('/api/tasks', newTask);

    // adding task to section
    dispatch(taskActions.addTasks(taskData.data));
  };

  return (
    <TaskCardAnimation>
      <div className=" max-w-screen-md bg-primary rounded-lg mb-3 mx-3">
        <form onSubmit={submitTaskHandler} className="flex flex-col p-2">
          <label className="mb-1">
            What do you want to level up in your life?
          </label>
          <input
            type="text"
            placeholder="FC wut do?"
            ref={descriptionRef}
            className="bg-tertiary outline-none h-8 px-1 rounded-lg border-white"
          />
          <br />
          <button
            type="submit"
            className="ml-auto bg-green-700 py-[2px] px-[4px] rounded-lg mb-2"
          >
            Submit
          </button>

          <button
            onClick={e => {
              e.preventDefault();
              setShowOptions(prevState => {
                setShowOptions(!prevState);
              });
            }}
            className="flex w-fit bg-tertiary items-center ml-auto px-3 p-[3px] rounded-lg"
          >
            {!showOptions ? 'More options' : 'Close options'}
            {!showOptions ? btnArrowDown : btnArrowUp}
          </button>
        </form>
        {showOptions && (
          <div className="flex">
            <MyCalendar
              getDaysHandler={getDaysHandler}
              todayOn={true}
              className="grow-0"
            />
            <TaskFormOptions
              getOptionHandler={getOptionHandler}
              className="grow"
            />
          </div>
        )}
      </div>
    </TaskCardAnimation>
  );
};

export default NewTaskForm;
