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

  // onCloseInputHandler
  const onCloseInputHandler = idToDelete => {
    setAddInputForm(prevState => {
      const updatedArray = prevState.filter(
        component => component.id !== idToDelete
      );
      return updatedArray;
    });
  };

  // submit handler render
  const newSubtaskButtonHandler = () => {
    setAddInputForm(prevState => [
      ...prevState,
      {
        id: prevState.length,
        jsx: (
          <NewSubTaskFrom
            key={prevState.length}
            index={prevState.length}
            taskData={{ taskId: props.taskId, repeat: props.repeat }}
            hasSubTask={props.hasSubTask}
            onClose={onCloseInputHandler}
          />
        ),
      },
    ]);
  };

  const inputContent = addInputForm.map(input => input.jsx);

  return (
    <div className="mt-2 mx-3">
      {/* subtask and input field */}
      <div className="flex flex-col">
        {subtaskContent}
        {inputContent}
      </div>
      <div
        className={`flex justify-center h-12  ${
          (!props.hasSubTask && 'border-t border-ColorSix',
          inputContent.length >= 1 && 'border-t border-ColorSix')
        }`}
      >
        {/* new task button */}
        <button
          onClick={newSubtaskButtonHandler}
          className="group hover:scale-105"
        >
          <p className={`text-ColorSix group-hover:text-TextColor`}>
            Press here to make new Subtask
          </p>
        </button>
      </div>
    </div>
  );
};

export default SubTask;
