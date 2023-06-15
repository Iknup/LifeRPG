import { useState, useRef } from 'react';
import axios from 'axios';
import TaskCardAnimation from '../animation/TaskCardAnimation';
import TaskFormOptions from './TaskFormOptions';
import MyCalendar from '../Calendar';
import { TaskClass } from '../../classes/TaskClass';
import { taskActions } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { REPEAT_ENUM } from '@/utility/ENUM';

const NewTaskForm = props => {
  const [showOptions, setShowOptions] = useState(false);
  const descriptionRef = useRef();
  const [selectedDays, setSelectedDays] = useState([]);
  const [options, setOptions] = useState({});
  const [isRPG, setIsRPG] = useState(false);
  const dispatch = useDispatch();

  const getDaysHandler = days => {
    // make a limit of the repeating days
    setSelectedDays(days);
  };

  // getting an option from TaskFormOptions
  const getOptionHandler = options => {
    setOptions(options);
    setShowOptions(prevState => setShowOptions(!prevState));
  };

  const showOptionsHandler = () => {
    setShowOptions(!showOptions);
  };

  const setRPGHandler = () => {
    setIsRPG(prev => setIsRPG(!prev));
  };

  const submitTaskHandler = async () => {
    const descriptionValueRef = descriptionRef.current.value;
    const { repeat } = options;
    const selectedDaysInteger = selectedDays?.map(day => day.getDay());
    let taskOptions = {};

    if (isRPG) {
      taskOptions = {
        level: 1,
        experience: 0,
        selectedDays: selectedDaysInteger || [],
        repeat: !repeat ? REPEAT_ENUM.DAILY : repeat,
      };
    } else {
      taskOptions = {
        selectedDays: selectedDaysInteger,
        repeat,
      };
    }

    const newTask = {
      description: descriptionValueRef,
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

  const buttonSubmitHandler = () => {
    submitTaskHandler();

    descriptionRef.current.value = '';
  };

  return (
    <TaskCardAnimation>
      <div
        className="h-[56px] bg-ColorThree mb-3 mx-3 rounded-md flex
      "
      >
        <input
          className="grow bg-ColorThree mx-1 h-1/2 self-center ml-3 
          text-colorMain placeholder:text-TextColor placeholder:text-sm"
          placeholder="Add a new task here... FC WUT DO?!"
          ref={descriptionRef}
        />
        <div className="ml-auto flex">
          {/* RPG Checkbox */}
          <button onClick={setRPGHandler} className="ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 ${isRPG ? 'bg-ColorSix rounded-lg' : null}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </button>
          {/* Calendar Button */}
          <button className="ml-1" onClick={showOptionsHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </button>
          {/* Submit Button */}
          <button onClick={buttonSubmitHandler} className="ml-1 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      {showOptions && (
        <TaskFormOptions
          getOptionHandler={getOptionHandler}
          getDaysHandler={getDaysHandler}
          className="absolute top-0 z-40 translate-x-[90%]"
        />
      )}
    </TaskCardAnimation>
  );
};

export default NewTaskForm;
