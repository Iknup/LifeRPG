import TaskPlus from '@/icons/jsx/TaskPlus';
import TaskPlusAble from '@/icons/jsx/TaskPlusAble';
import { useState } from 'react';
import { addSubTask } from '@/slices/subtaskSlice';
import { editTask } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';
import SubtaskCancel from '@/icons/jsx/subtask/SubtaskCancel';

const NewSubTaskFrom = props => {
  const [isValidate, setIsValidate] = useState(false);
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
      parentTask: props.taskId,
    };

    dispatch(
      addSubTask({ subTaskdata: subtaskData, hasTask: props.hasSubTask })
    );

    if (!props.hasSubTask) {
      dispatch(
        editTask({
          taskData: { taskID: props.taskId, hasSubTask: !props.hasSubTask },
          isEdit: true,
        })
      );
    }

    props.onClose(props.index);
  };

  return (
    <div className="flex justify-between mb-2">
      <input
        onChange={inputChangeHandler}
        placeholder="Sub task title here..."
        className="bg-ColorFour grow indent-1"
      />
      <div className="ml-1">
        <button disabled={!isValidate} onClick={submitButtonHandler}>
          {!isValidate ? <TaskPlus scale={12} /> : <TaskPlusAble scale={12} />}
        </button>
        <button
          onClick={() => {
            props.onClose(props.index);
          }}
          className="ml-[2px]"
        >
          <SubtaskCancel scale={12} className="hover:text-btnReject" />
        </button>
      </div>
    </div>
  );
};

export default NewSubTaskFrom;
