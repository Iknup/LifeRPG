import TaskDeleteButton from '@/icons/jsx/TaskDeleteButton';
import TaskEditButton from '@/icons/jsx/TaskEditButton';
import SubtaskChecked from '@/icons/jsx/subtask/SubtaskChecked';
import SubtaskUnchecked from '@/icons/jsx/subtask/SubtaskUnchecked';
import { useDispatch } from 'react-redux';
import { deleteSubtask, editSubtask } from '@/slices/subtaskSlice';

const SubtaskInfo = props => {
  const { title, isComplete, require, _id } = props.taskData;
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(deleteSubtask({ subtaskId: _id, parentId: props.parentId }));
  };

  const onClearHandler = () => {
    dispatch(
      editSubtask({
        subtaskData: { isComplete: !isComplete, _id },
        parentId: props.parentId,
      })
    );
  };
  return (
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
        <button className="ml-[2px] scale-0 group-hover:scale-100">
          <TaskEditButton scale={12} />
        </button>
        <button
          onClick={onDeleteHandler}
          className="ml-[2px] scale-0 group-hover:scale-100"
        >
          <TaskDeleteButton scale={12} />
        </button>
      </div>
    </div>
  );
};

export default SubtaskInfo;
