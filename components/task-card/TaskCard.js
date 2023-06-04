import { getRequiredExpForLevel, getPrevLevelExp } from '@/utility/levelexp';
import { useState } from 'react';
import Modal from '../Modal';
import axios from 'axios';
import Unchecked from '@/icons/jsx/01-yellow/Unchecked';
import Checked from '@/icons/jsx/01-yellow/Checked';
import Hover from '@/icons/jsx/01-yellow/Hover';

const TaskCard = props => {
  const { deleteTaskFromSection } = props;
  const [task, setTask] = useState(props.task);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isComplete,
    description,
    level,
    experience,
    _id,
    isRPG,
    repeat,
    timeCompleted,
    timeGenerated,
    selectedDays,
  } = task;

  const [checked, setChecked] = useState(isComplete);
  const [isHovered, setIsHovered] = useState(false);

  const nextLevelExp = getRequiredExpForLevel(level);
  const prevLevelExp = getPrevLevelExp(level);
  const clearRate = (timeCompleted / timeGenerated) * 100;

  const expBar =
    (
      ((experience - prevLevelExp) / (nextLevelExp - prevLevelExp)) *
      100
    ).toFixed(1) + '%';

  const onClearHandler = async () => {
    const updatedData = { isComplete: checked };

    try {
      const response = await axios.patch(`/api/task/${_id}`, updatedData);
      const { data } = response;
      setTask(data);
      setChecked(prev => !prev);
    } catch (e) {
      console.error(e);
    }
  };

  const onCheckboxClickHandler = () => {
    onClearHandler();
  };

  // Delete handler
  const onDeleteHandler = async taskId => {
    try {
      console.log(taskId);
      const response = await axios.delete(`/api/task/${taskId}`);
      console.log(response);
      deleteTaskFromSection(_id);
    } catch (e) {
      console.error(e);
    }
  };

  // Delete handler function by delete button click
  const onClickDeleteHandler = () => {
    onDeleteHandler(_id);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let checkboxButton = checked ? (
    <Checked className={'checkbox-button'} />
  ) : (
    <Unchecked className={'checkbox-button'} />
  );

  if (isHovered) {
    checkboxButton = <Hover className={'checkbox-button'} />;
  }

  //modal open and close functions
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  // if (level < 10) {
  //   expCal = 'bg-green-700 h-full rounded-full';
  // } else if (level >= 10 && level < 20) {
  //   expCal = 'bg-blue-700 h-full rounded-full';
  // } else if (level >= 20 && level < 30) {
  //   expCal = 'bg-red-700 h-full rounded-full';
  // }

  return (
    <div
      className={`h-28 bg-secondary rounded-md mb-3 mx-3 relative    
      `}
    >
      {/* Interaction menu button */}
      <div className="pr-1.5 pt-1.5 flex justify-end">
        {/* clear rate button */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="taskCard-button"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* edit button */}
        <button>
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
          {description}
        </p>
      </div>
      {/* level and exp */}
      {isRPG && (
        <div className="flex justify-between mx-3 text-[15px]">
          <p>Lvl {level}</p>
          <p>{expBar}</p>
        </div>
      )}
      {/* exp bar */}
      {isRPG && (
        <div className="w-full h-[7%] rounded-b-md bg-primary overflow-hidden">
          <div
            className="bg-colorMain h-full rounded-bl-md"
            style={{ width: expBar }}
          ></div>
        </div>
      )}
      {isModalOpen && (
        <Modal
          confirm={onClickDeleteHandler}
          reject={modalClose}
          message={'Do you wish to delete?'}
        />
      )}
    </div>
  );
};

export default TaskCard;
