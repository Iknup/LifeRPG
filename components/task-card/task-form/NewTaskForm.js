import { useState } from 'react';
import TaskCardAnimation from '../../animation/TaskCardAnimation';
import TaskFormOptions from './TaskFormOptions';
import { TaskClass } from '../../../classes/TaskClass';
import { addTask } from '@/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { REPEAT_ENUM } from '@/utility/ENUM';
import RPGCheck from '@/icons/jsx/RPGCheck';
import TaskPlus from '@/icons/jsx/TaskPlus';
import TaskPlusAble from '@/icons/jsx/TaskPlusAble';
import useClickOutside from '@/hooks/useClickOutside';
import TaskFormIndicator from './TaskFormIndicator';

const NewTaskForm = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [description, setDescription] = useState('');
  const [validate, setValidate] = useState(false);
  const [options, setOptions] = useState({});
  const [isRPG, setIsRPG] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  // getting an option from TaskFormOptions
  const getOptionAndDaysHandler = options => {
    setOptions(options);
    setValidate(optionsValidateChecker(options) && description.length >= 1);
    if (options.selectedDays || errorMessage) {
      setShowIndicator(true);
    } else {
      setShowIndicator(false);
    }
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

  const optionsValidateChecker = option => {
    const { repeat, selectedDays } = option;

    if (repeat === REPEAT_ENUM.EVERY_WEEKDAYS && selectedDays.length >= 7) {
      setErrorMessage('You can set up to 7 days for weekly repeat');
      return false;
    } else if (
      (repeat === REPEAT_ENUM.MONTHLY || repeat === REPEAT_ENUM.NONE) &&
      selectedDays.length !== 1
    ) {
      setErrorMessage(
        `You can set only 1 day for ${
          repeat === REPEAT_ENUM.MONTHLY
            ? REPEAT_ENUM.MONTHLY + ' repeat'
            : REPEAT_ENUM.NONE + ' repeat'
        }`
      );
      return false;
    } else {
      setErrorMessage(null);
      return true;
    }
  };

  const onChangeDescriptionHandler = e => {
    setDescription(e.target.value);
    setValidate(optionsValidateChecker(options) && e.target.value.length >= 1);
  };

  const submitTaskHandler = () => {
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

    // adding task to section
    dispatch(addTask(newTask));
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    submitTaskHandler();
    setValidate(false);
    setDescription('');
    setOptions({});
  };

  return (
    <TaskCardAnimation>
      <div
        ref={domNode}
        className=" bg-ColorThree mb-3 mx-3 rounded-md overflow-hidden 
      "
      >
        <div className="flex h-[56px]">
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
              onClick={onSubmitHandler}
              disabled={!validate}
              className={`ml-1 ${
                validate ? 'mr-2' : 'mr-3'
              } h-fit self-center ${
                validate && ' scale-110 shadow-addButtonShadow'
              }`}
            >
              {!validate ? (
                <TaskPlus scale={12} />
              ) : (
                <TaskPlusAble scale={12} />
              )}
            </button>
          </div>
        </div>
        {(showIndicator || errorMessage) && (
          <div className="bg-ColorOne flex mb-[2px]">
            <TaskFormIndicator
              repeat={options.repeat}
              selectedDays={options.selectedDays}
              errorMessage={errorMessage}
            />
          </div>
        )}
        {showOptions && (
          <TaskFormOptions
            getOptionAndDaysHandler={getOptionAndDaysHandler}
            className="absolute top-0 left-0 z-50 translate-x-[90%]"
            closeOptionHandler={closeOptionHandler}
            options={options}
          />
        )}
      </div>
    </TaskCardAnimation>
  );
};

export default NewTaskForm;
