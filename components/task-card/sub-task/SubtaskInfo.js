import TaskDeleteButton from '@/icons/jsx/TaskDeleteButton';
import TaskEditButton from '@/icons/jsx/TaskEditButton';
import SubtaskChecked from '@/icons/jsx/subtask/SubtaskChecked';
import SubtaskUnchecked from '@/icons/jsx/subtask/SubtaskUnchecked';
import { useDispatch } from 'react-redux';
import { deleteSubtask, editSubtask } from '@/slices/subtaskSlice';
import { Fragment, useState } from 'react';
import NewSubTaskFrom from './NewSubTaskFrom';
import useClickOutside from '@/hooks/useClickOutside';

const SubtaskInfo = props => {
  const { subtaskData, parentId, hasSubTask, parentRepeat } = props;
  const { title, isComplete, _id, repeat } = subtaskData;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const onDeleteHandler = () => {
    if (deleteConfirm) {
      dispatch(deleteSubtask({ subtaskId: _id, parentId }));
    } else {
      setDeleteConfirm(true);
    }
  };

  const domNode = useClickOutside(() => {
    if (!isEdit) {
      setDeleteConfirm(false);
    } else {
      setIsEdit(false);
    }
  });

  const playSound = () => {
    const audio = new Audio('/sound/pencilCheck.wav');

    audio.addEventListener('canplaythrough', () => {
      // The sound is ready to play
      audio.volume = 0.3;
      audio.play();
    });
    audio.addEventListener('error', error => {
      console.error('Error loading the audio:', error);
    });
  };

  const onClearHandler = () => {
    if (!isComplete) {
      playSound();
    }

    dispatch(
      editSubtask({
        subtaskData: { isComplete: !isComplete, _id },
        parentId,
      })
    );
  };

  const onEditHandler = () => {
    setIsEdit(prevState => !prevState);
  };
  return (
    <Fragment>
      {isEdit ? (
        <div ref={domNode}>
          <NewSubTaskFrom
            taskData={{ taskId: parentId, repeat: parentRepeat }}
            subtaskData={subtaskData}
            onClose={onEditHandler}
            hasSubTask={hasSubTask}
          />
        </div>
      ) : (
        <div
          className="flex justify-between border-b border-ColorSix mb-2
   group hover:bg-quinary
  "
        >
          <div className="flex">
            <button onClick={onClearHandler} className="mr-2">
              {isComplete ? (
                <SubtaskChecked scale={12} />
              ) : (
                <SubtaskUnchecked scale={12} />
              )}
            </button>
            <p>{title}</p>
          </div>
          <div className="flex align-middle">
            {repeat && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 self-center scale-0 group-hover:scale-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                />{' '}
              </svg>
            )}
            <button
              onClick={onEditHandler}
              className="ml-[2px] scale-0 group-hover:scale-100"
            >
              <TaskEditButton scale={12} />
            </button>
            <button
              ref={domNode}
              onClick={onDeleteHandler}
              className={`ml-[2px] scale-0 group-hover:scale-100 
              ${
                deleteConfirm && ' animate-wiggleOnce text-LightRed scale-110'
              }`}
            >
              <TaskDeleteButton scale={12} />
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SubtaskInfo;
