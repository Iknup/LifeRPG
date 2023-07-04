import { getRequiredExpForLevel, getPrevLevelExp } from '@/utility/levelexp';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { taskActions } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../Modals/ConfirmModal';
import axios from 'axios';
import Unchecked from '@/icons/jsx/NewChecked/Unchecked';
import Checked from '@/icons/jsx/NewChecked/Checked';
import CheckHover from '@/icons/jsx/NewChecked/CheckHover';
import Repeat from './Repeat';
import TaskCardUI from '../UI/TaskCardUI';
import TaskDropDown from './TaskDropDown';
import TaskCardMenu from './TaskCardMenu';
import useClickOutside from '@/hooks/useClickOutSide';
import ExpandMenu from '@/icons/jsx/ExpandMenu';

const TaskInfo = props => {
  const [task, setTask] = useState(props.task);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(task.isComplete);
  const [isHovered, setIsHovered] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { taskEditHandler } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    setTask(props.task);
    setChecked(props.task.isComplete);
  }, [props.task]);

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

  //menu close function
  const menuCloseHandler = () => {
    setIsMenuOpen(false);
  };

  const domNode = useClickOutside(() => {
    setIsMenuOpen(false);
  });

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
        <div ref={domNode} className="pr-1.5 pt-1.5 flex justify-end relative">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="hover:scale-125"
          >
            <ExpandMenu />
          </button>
          {isMenuOpen && (
            <AnimatePresence>
              <TaskCardMenu
                menuClose={menuCloseHandler}
                onEdit={taskEditHandler}
                onDelete={modalOpen}
              />
            </AnimatePresence>
          )}
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
          <TaskDropDown
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
