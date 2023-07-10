import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSubtask } from '@/slices/subtaskSlice';
import NewSubTaskFrom from './NewSubTaskFrom';
import SubtaskInfo from './SubtaskInfo';

const SubTask = props => {
  const [addInputForm, setAddInputForm] = useState([]);
  const subtasksStore = useSelector(state => state.subtasks.subtaskWrappers);
  const dispatch = useDispatch();

  // getting subtasks data from redux
  const subtaskWrapper = subtasksStore.find(subtaskWrapper => {
    return subtaskWrapper.parentId === props.taskId;
  });

  // api call if no subtasks is found from redux
  useEffect(() => {
    if (props.hasSubTask && !subtaskWrapper) {
      dispatch(getSubtask(props.taskId));
    }
  }, []);

  let subtaskContent;

  // mapping the component by it's data
  if (props.hasSubTask && subtaskWrapper) {
    subtaskContent = subtaskWrapper.subtasks.map(subtask => (
      <SubtaskInfo
        taskData={subtask}
        parentId={props.taskId}
        key={subtask._id}
      />
    ));
  }

  // submit handler render
  const newSubTaskButtonHandler = () => {
    setAddInputForm(prevState => [
      ...prevState,
      <NewSubTaskFrom
        key={prevState.length}
        taskId={props.taskId}
        hasSubTask={props.hasSubTask}
      />,
    ]);
  };

  return (
    <div className="mt-2 mx-3">
      {/* subtask and input field */}
      <div className="flex flex-col">
        {subtaskContent}
        {addInputForm}
      </div>
      <div
        className={`flex justify-center h-12  ${
          !props.hasSubTask && 'border-t border-ColorSix'
        }`}
      >
        {/* new task button */}
        <button
          onClick={newSubTaskButtonHandler}
          className="group hover:scale-105"
        >
          <p className="text-ColorSix group-hover:text-TextColor">
            Press here to make new Subtask
          </p>
        </button>
      </div>
    </div>
  );
};

export default SubTask;
