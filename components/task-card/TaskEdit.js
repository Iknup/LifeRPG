import SaveIcon from '@/icons/jsx/SaveIcon';
import TaskCardUI from '../UI/TaskCardUI';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '@/slices/taskSlice';
import Repeat from './Repeat';
import TaskFormOptions from './task-form/TaskFormOptions';
import { REPEAT_ENUM } from '@/utility/ENUM';
import { TaskClass } from '../../classes/TaskClass';
import Portal from '../Portal';

const TaskEdit = props => {
  const { taskEditHandler, task, getUpdatedTaskHandler } = props;
  const [options, setOptions] = useState({
    repeat: task.repeat,
    selectedDays: task.selectedDays,
  });
  const user = useSelector(state => state.users.user);
  const [validate, setValidate] = useState();
  const [description, setDescription] = useState(task.description);
  const [showOptions, setShowOptions] = useState(true);
  const [isRPG, setIsRPG] = useState(task.isRPG);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      console.log(rect);
      setPosition({ top: rect.top, left: rect.left });
      window.scrollTo({
        top: position.top + 112,
        behavior: 'smooth',
      });
    }
  }, []);

  const showOptionsHandler = () => {
    setShowOptions(!showOptions);
  };

  const closeOptionHandler = () => {
    setShowOptions(false);
  };

  const getOptionAndDaysHandler = options => {
    setOptions(options);
    closeOptionHandler();
  };

  const setRPGHandler = () => {
    setIsRPG(!isRPG);
  };

  const descriptionChangeHandler = e => {
    const value = e.target.value;
    setDescription(value);
    if (value > 1) {
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
        level: task.level ? task.level : 1,
        experience: task.experience ? task.experience : 0,
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
      taskId: task._id,
      ...taskOptions,
    };

    if (task.repeat === 'None' && newTask.repeat !== 'None') {
      Object.setPrototypeOf(newTask, TaskClass.prototype);
      newTask.setResetHandler(user.resetSchedule);
    }

    dispatch(editTask({ taskData: newTask, isEdit: true }));
  };

  const updateTaskHandler = () => {
    submitTaskHandler();

    taskEditHandler();
  };

  return (
    <TaskCardUI className="mb-3">
      <div ref={ref} className="pr-1.5 pt-1.5 flex justify-end">
        {/* RPG Button */}
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
        {/* Option Button */}
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
        {/* Save Button */}
        <button onClick={updateTaskHandler} className="ml-1">
          <SaveIcon />
        </button>
        {/* Cancel Button */}
        <button
          onClick={() => {
            taskEditHandler();
          }}
          className="ml-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex h-[50%] ml-4">
        <input
          onChange={descriptionChangeHandler}
          value={description}
          className="grow bg-ColorFour pl-2 h-1/2 place-self-center mr-4"
        />
        <div className="ml-auto">
          <Repeat
            key={task._id}
            repeat={options.repeat}
            selectedDays={task.selectedDays ? task.selectedDays : null}
          />
        </div>
      </div>
      {showOptions && (
        <Portal>
          <div
            className={`z-50 `}
            style={{
              position: 'absolute',
              top: position.top + 112,
              left: position.left,
            }}
          >
            <TaskFormOptions
              getOptionAndDaysHandler={getOptionAndDaysHandler}
              closeOptionHandler={closeOptionHandler}
              options={options}
            />
          </div>
        </Portal>
      )}
    </TaskCardUI>
  );
};

export default TaskEdit;
