import { useState } from 'react';
import axios from 'axios';
import TaskCardAnimation from '../animation/TaskCardAnimation';
import TaskFormOptions from './TaskFormOptions';
import { TaskClass } from '../../classes/TaskClass';
import { taskActions } from '@/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { REPEAT_ENUM } from '@/utility/ENUM';
import RPGCheck from '@/icons/jsx/RPGCheck';
import TaskPlus from '@/icons/jsx/TaskPlus';
import TaskPlusAble from '@/icons/jsx/TaskPlusAble';
import useClickOutside from '@/hooks/useClickOutside';

const NewTaskForm = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [description, setDescription] = useState('');
  const [validate, setValidate] = useState(false);
  const [options, setOptions] = useState({});
  const [isRPG, setIsRPG] = useState(false);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  // getting an option from TaskFormOptions
  const getOptionAndDaysHandler = options => {
    setOptions(options);
    closeOptionHandler();
  };

  const showOptionsHandler = () => {
    setShowOptions(!showOptions);
  };

  const closeOptionHandler = () => {
    setShowOptions(false);
  };

  const domNode = useClickOutside(() => {
    setShowOptions(false);
  });

  const setRPGHandler = () => {
    setIsRPG(prev => setIsRPG(!prev));
  };

  const onChangeDescriptionHandler = e => {
    setDescription(e.target.value);
    if (e.target.value.length > 1) {
      setValidate(true);
    } else setValidate(false);
  };

  const submitTaskHandler = async () => {
    const descriptionValue = description;
    const { repeat, selectedDays } = options;
    const selectedDaysInteger = selectedDays?.map(day => day.getDay());
    const selectedDaysIntSorted = selectedDaysInteger?.sort((a, b) => a - b);
    let taskOptions = {};

    if (isRPG) {
      taskOptions = {
        level: 1,
        experience: 0,
        selectedDays: selectedDaysIntSorted || [],
        repeat: !repeat ? REPEAT_ENUM.DAILY : repeat,
      };
    } else {
      taskOptions = {
        selectedDays: selectedDaysIntSorted || [],
        repeat,
      };
    }

    if (repeat === REPEAT_ENUM.MONTHLY) {
      taskOptions.selectedDate = selectedDays[0];
    }

    const newTask = {
      description: descriptionValue,
      repeat,
      isRPG,
      user: user._id,
      ...taskOptions,
    };

    if (newTask.repeat !== 'None') {
      Object.setPrototypeOf(newTask, TaskClass.prototype);
      newTask.setResetHandler();
    }

    const taskData = await axios.post('/api/task', newTask);

    // adding task to section
    dispatch(taskActions.addTasks(taskData.data));
  };

  const buttonSubmitHandler = () => {
    submitTaskHandler();
    setValidate(false);
    setDescription('');
    setOptions({});
  };

  return (
    <TaskCardAnimation>
      <div
        ref={domNode}
        className="h-[56px] bg-ColorThree mb-3 mx-3 rounded-md flex
      "
      >
        <input
          className={`grow bg-ColorThree mx-1 h-1/2 self-center ml-3 
          text-colorMain placeholder:text-TextColor placeholder:text-sm `}
          placeholder="Add a new task here... FC WUT DO?!"
          onChange={onChangeDescriptionHandler}
          value={description}
        />
        <div className="ml-auto flex">
          {/* RPG Checkbox */}
          <button
            onClick={setRPGHandler}
            className={`ml-3 ${isRPG && 'scale-125'}`}
          >
            <RPGCheck active={isRPG} />
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
          <button
            onClick={buttonSubmitHandler}
            disabled={!validate}
            className={`ml-1 ${validate ? 'mr-2' : 'mr-3'} h-fit self-center ${
              validate &&
              'bg-colorSub rounded-md border-solid border-2 border-testColorTwo scale-110 '
            }`}
          >
            {!validate ? <TaskPlus scale={12} /> : <TaskPlusAble scale={12} />}
          </button>
        </div>
        {showOptions && (
          <TaskFormOptions
            getOptionAndDaysHandler={getOptionAndDaysHandler}
            className="absolute top-0 left-0 z-50 translate-x-[90%]"
            closeOptionHandler={closeOptionHandler}
            options={options}
            ref={domNode}
          />
        )}
      </div>
    </TaskCardAnimation>
  );
};

export default NewTaskForm;
