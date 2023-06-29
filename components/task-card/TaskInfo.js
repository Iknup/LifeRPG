import { getRequiredExpForLevel, getPrevLevelExp } from '@/utility/levelexp';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { taskActions } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../Modals/ConfirmModal';
import axios from 'axios';
import Unchecked from '@/icons/jsx/NewChecked/Unchecked';
import Checked from '@/icons/jsx/NewChecked/Checked';
import CheckHover from '@/icons/jsx/NewChecked/CheckHover';
import Repeat from './Repeat';
import TaskStatus from './TaskStatus';
import TaskCardUI from '../UI/TaskCardUI';

const TaskInfo = props => {
  const [task, setTask] = useState(props.task);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(task.isComplete);
  const [isHovered, setIsHovered] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { taskEditHandler } = props;

  const dispatch = useDispatch();

  // calcs
  const nextLevelExp = getRequiredExpForLevel(task.level);
  const prevLevelExp = getPrevLevelExp(task.level);
  const clearRate = (task.timeCompleted / task.timeGenerated) * 100;
  const expBar =
    (
      ((task.experience - prevLevelExp) / (nextLevelExp - prevLevelExp)) *
      100
    ).toFixed(1) + '%';

  // CheckboxButton chnages

  let checkboxButton = checked ? (
    <Checked className={'checkbox-button'} />
  ) : (
    <Unchecked className={'checkbox-button'} />
  );

  if (isHovered) {
    checkboxButton = <CheckHover className={'checkbox-button'} />;
  }

  // onClearhandler
  const onClearHandler = async taskId => {
    const updatedData = { isComplete: checked };

    try {
      const response = await axios.patch(`/api/task/${taskId}`, updatedData);
      const { data } = response;
      setTask(data);
      setChecked(prev => !prev);
      dispatch(taskActions.updateTasks(data));
    } catch (e) {
      console.error(e);
    }
  };

  const onCheckboxClickHandler = () => {
    onClearHandler(task._id);
  };

  // Delete handler
  const onDeleteHandler = async taskId => {
    try {
      const response = await axios.delete(`/api/task/${taskId}`);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  // Delete handler function by delete button click
  const onClickDeleteHandler = () => {
    onDeleteHandler(task._id);
    dispatch(taskActions.deleteTasks(task._id));
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //modal open and close functions
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const dropDownHandler = () => {
    setDropDown(!dropDown);
  };

  // if (level < 10) {
  //   expCal = 'bg-green-700 h-full rounded-full';
  // } else if (level >= 10 && level < 20) {
  //   expCal = 'bg-blue-700 h-full rounded-full';
  // } else if (level >= 20 && level < 30) {
  //   expCal = 'bg-red-700 h-full rounded-full';
  // }

  return (
    <div className="mb-3" onDoubleClick={dropDownHandler}>
      <TaskCardUI>
        {/* Interaction menu button */}
        <div className="pr-1.5 pt-1.5 flex justify-end">
          {/* edit button */}
          <button
            onClick={() => {
              taskEditHandler();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="taskCard-button ml-1"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
          </button>
          {/* delete button */}
          <button onClick={modalOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="taskCard-button ml-1"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Check box and task description */}
        <div className="flex h-[50%] ml-4">
          <button
            onClick={onCheckboxClickHandler}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {checkboxButton}
          </button>
          <p className="flex items-center grow indent-3 text-[18px]">
            {task.description}
          </p>
          <Repeat
            key={task._id}
            repeat={task.repeat}
            selectedDays={task.selectedDays ? task.selectedDays : null}
          />
        </div>
        {/* level and exp */}
        {task.isRPG && (
          <div className="flex justify-between mx-3 text-[15px]">
            <p>Lv {task.level}</p>
            <p>{expBar}</p>
          </div>
        )}
        {/* exp bar */}
        {task.isRPG && (
          <div className="w-full h-[7%] rounded-b-md bg-primary overflow-hidden absolute bottom-0">
            <div
              className="bg-colorMain h-full rounded-bl-md"
              style={{ width: expBar }}
            ></div>
          </div>
        )}
        <AnimatePresence>
          {isModalOpen && (
            <ConfirmModal
              confirm={onClickDeleteHandler}
              reject={modalClose}
              message={'Do you wish to delete?'}
            />
          )}
        </AnimatePresence>
      </TaskCardUI>
      <AnimatePresence>
        {dropDown && (
          <TaskStatus
            statusData={{
              clearRate,
              expPercent: expBar,
              nextLevelExp,
              experience: task.experience,
              timesCompleted: task.timeCompleted,
              timesGenereated: task.timeGenerated,
              createdAt: task.createdAt,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskInfo;
