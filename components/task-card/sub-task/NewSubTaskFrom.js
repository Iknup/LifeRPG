import TaskPlus from '@/icons/jsx/TaskPlus';
import TaskPlusAble from '@/icons/jsx/TaskPlusAble';
import { useState } from 'react';
import { addSubTask, editSubtask } from '@/slices/subtaskSlice';
import { editTask } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';
import SubtaskCancel from '@/icons/jsx/subtask/SubtaskCancel';

const NewSubTaskFrom = props => {
  const { onClose, taskData, subtaskData, hasSubTask, index } = props;
  const [isValidate, setIsValidate] = useState(
    subtaskData?.title ? true : false
  );
  const [taskTitle, setTaskTitle] = useState(
    subtaskData?.title ? subtaskData.title : ''
  );
  const [repeat, setRepeat] = useState(subtaskData?.repeat || false);
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
    if (subtaskData) {
      const subtaskDoc = {
        title: taskTitle,
        repeat,
        _id: subtaskData._id,
      };

      dispatch(
        editSubtask({ subtaskData: subtaskDoc, parentId: taskData.taskId })
      );
    } else {
      const subtaskDoc = {
        title: taskTitle,
        parentTask: taskData.taskId,
      };

      dispatch(addSubTask({ subTaskdata: subtaskDoc, hasTask: hasSubTask }));

      if (!hasSubTask) {
        dispatch(
          editTask({
            taskData: { taskID: taskData.taskId, hasSubTask: !hasSubTask },
            isEdit: true,
          })
        );
      }
    }

    onClose(props.index);
  };

  return (
    <form onSubmit={submitButtonHandler} className="flex justify-between mb-2">
      <input
        onChange={inputChangeHandler}
        value={taskTitle}
        placeholder="Sub task title here..."
        className="bg-ColorFour grow indent-1"
      />
      <div className="ml-1 flex">
        <button
          type="button"
          onClick={() => {
            setRepeat(prevState => !prevState);
          }}
          className={repeat && 'text-colorMain'}
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
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>
        </button>
        <button type="submit" disabled={!isValidate}>
          {!isValidate ? <TaskPlus scale={12} /> : <TaskPlusAble scale={12} />}
        </button>
        <button
          type="button"
          onClick={() => {
            onClose(props.index);
          }}
          className="ml-[2px]"
        >
          <SubtaskCancel scale={12} className="hover:text-btnReject" />
        </button>
      </div>
    </form>
  );
};

export default NewSubTaskFrom;
