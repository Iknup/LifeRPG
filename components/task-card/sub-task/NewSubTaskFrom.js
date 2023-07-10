import TaskPlus from '@/icons/jsx/TaskPlus';
import TaskPlusAble from '@/icons/jsx/TaskPlusAble';
import { useState } from 'react';
import { addSubTask } from '@/slices/subtaskSlice';
import { editTask } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';

const NewSubTaskFrom = props => {
  const [isValidate, setIsValidate] = useState(false);
  const [isRequire, setIsRequire] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch();

  const inputChangeHandler = e => {
    setTaskTitle(e.target.value);
    if (taskTitle.length > 1) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };

  const submitButtonHandler = () => {
    const subtaskData = {
      title: taskTitle,
      require: isRequire,
      parentTask: props.taskId,
    };

    if (!props.hasSubTask) {
      dispatch(editTask({ hasSubTask: !props.hasSubTask }, true));
    }

    dispatch(addSubTask(subtaskData, props.hasSubTask));
  };

  return (
    <div className="flex justify-between mb-2">
      <input
        onChange={inputChangeHandler}
        placeholder="Sub task title here..."
        className="bg-ColorFour grow indent-1"
      />
      <div className="ml-1">
        <button
          onClick={() => {
            setIsRequire(!isRequire);
          }}
          className={`align-middle mr-[2px] ${
            isRequire && 'bg-ColorTwo scale-105'
          }`}
        >
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
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button disabled={!isValidate} onClick={submitButtonHandler}>
          {!isValidate ? <TaskPlus scale={12} /> : <TaskPlusAble scale={12} />}
        </button>
      </div>
    </div>
  );
};

export default NewSubTaskFrom;
